import { Request, RequestHandler, Response } from 'express';
import { connectionSource } from '../database/data-source';
import { Language, LanguageDetail, User } from '../database/entities';
import { validate as isValidUUID } from 'uuid';
import responseHandler, {
  programmingLanguages,
} from '../services/language.service';
import axios from 'axios';
import { ILike, QueryBuilder } from 'typeorm';

const languageRepository = connectionSource.getRepository(Language);
const languageDetailRepository = connectionSource.getRepository(LanguageDetail);

const userRepository = connectionSource.getRepository(User);

const addLanguage: RequestHandler = async (req: Request, res: Response) => {
  try {
    let { userId, languages } = req.body;
    const programmingLanguages = await languageRepository.find();

    if (programmingLanguages.length < 1) {
      await languageRepository.createQueryBuilder().delete().execute();
      for (const lang of programmingLanguages) {
        const savedLang = languageRepository.create({ name: lang.name });
        await languageRepository.save(savedLang);
      }
    }

    languages = languages.map((language: string) => language.toLowerCase());
    let checkLanguageArray = programmingLanguages.map((language) =>
      language.name.toLowerCase()
    );

    let misMatchFound = false;

    for (const language of languages) {
      if (!checkLanguageArray.includes(language)) {
        misMatchFound = true;
        break;
      }
    }

    if (misMatchFound)
      return responseHandler.badRequest(
        res,
        'Chosen language must be in the recommended list'
      );

    languages = Array.from(new Set(languages));

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) return responseHandler.notFound(res, 'User not found');

    const oldLangs = await languageDetailRepository.find({
      where: { user: { id: userId } },
	  relations: ['language', 'user']
    });

    for (const lang of oldLangs) await languageDetailRepository.remove(lang);

    const addedLanguages = await Promise.all(
      languages.map(async (language: string) => {
        const languageRef = await languageRepository.findOne({
          where: { name: ILike(`%${language}%`) },
        });

        let addedLang = languageDetailRepository.create({
          language: languageRef,
          section: { id: 24 },
          user,
        });

        let toAdd = await languageDetailRepository.save(addedLang);

        return {
          id: toAdd.id,
          userId: toAdd.user.id,
          language: toAdd.language.name,
          section: 24,
        };
      })
    );

    return responseHandler.success(res, addedLanguages);
  } catch (error) {
    return responseHandler.serverError(res, error);
  }
};

const getUserLanguages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;

    if (!isValidUUID(userId))
      return responseHandler.badRequest(
        res,
        'userId must be a valid UUID string'
      );

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return responseHandler.notFound(res, 'User not found');

    const allLanguageDetails = await languageDetailRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['language', 'user'],
    });

    const userLanguages = allLanguageDetails.map((v) => ({
      id: v.id,
      userId: v.user.id,
      language: v.language.name,
      section: 24,
    }));

    return responseHandler.success(res, userLanguages);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const deleteAllUserLanguages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;

    if (!isValidUUID(userId))
      return responseHandler.badRequest(
        res,
        'userId must be a valid UUID string'
      );

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return responseHandler.notFound(res, 'User not found');

    await languageDetailRepository.delete({ user: { id: userId } });

    return responseHandler.success(res, []);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const addProgrammingLanguages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const savedLangsObject = await languageRepository.find();
    const savedLanguages = savedLangsObject.map((v) => v.name);

    programmingLanguages.map(async (language) => {
      if (!savedLanguages.includes(language)) {
        const lang = languageRepository.create({
          name: language,
        });
        await languageRepository.save(lang);
      }
    });

    return responseHandler.success(res, 'saved all languages');
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const getProgrammingLanguages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    let languageObject = await languageRepository.find();
    const languages = languageObject.map((v) => v.name);
    return responseHandler.success(res, languages);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

export default {
  addLanguage,
  getUserLanguages,
  deleteAllUserLanguages,
  addProgrammingLanguages,
  getProgrammingLanguages,
};
