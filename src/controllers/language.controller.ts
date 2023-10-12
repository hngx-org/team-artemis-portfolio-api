import { Request, RequestHandler, Response } from 'express';
import { User } from '../database/entity/user';
import { connectionSource } from '../database/data-source';
import { Language } from '../database/entity/model';
import responseHandler from '../services/language.service';

const languageRepository = connectionSource.getRepository(Language);
const userRepository = connectionSource.getRepository(User);

const addLanguage: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { userId, language } = req.body;

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) return responseHandler.notFound(res, 'User not found');

    const existsUserLanguage = await languageRepository.findOneBy({
      userId,
      language,
    });

    if (existsUserLanguage)
      return responseHandler.badRequest(res, 'User language already exists');

    const userLanguage = new Language();
    userLanguage.userId = userId;
    userLanguage.language = language;

    await languageRepository.save(userLanguage);

    return responseHandler.created(res, userLanguage);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const updateLanguage: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id, userId, preferred, language } = req.body;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return responseHandler.notFound(res, 'User not found');

    let userLanguage = await languageRepository.findOneBy({ id, userId });
    if (!userLanguage)
      return responseHandler.notFound(
        res,
        'language belonging to user not found'
      );

    if (preferred) {
      let userLanguages = await languageRepository.find({ where: { userId } });
      userLanguages.map(async (v) => {
        if (v.id != id) {
          v.preferred = false;
          await languageRepository.save(v);
        }
      });
    }

    userLanguage.preferred = preferred;
    userLanguage.language = language;

    await languageRepository.save(userLanguage);

    return responseHandler.success(res, userLanguage);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const getLanguages: RequestHandler = async (req: Request, res: Response) => {
  try {
    const languages = responseHandler.retrieveLanguages();

    return responseHandler.success(res, languages);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const getUserLanguages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return responseHandler.notFound(res, 'User not found');

    const userLanguages = await languageRepository.find({
      where: { userId: userId },
    });

    return responseHandler.success(res, userLanguages);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const getPreferredUserLanguage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) return responseHandler.notFound(res, 'User not found');

    const preferredLanguage = await languageRepository.findOneBy({
      userId,
      preferred: true,
    });

    if (!preferredLanguage)
      return responseHandler.notFound(res, 'No preferred language found');

    return responseHandler.success(res, preferredLanguage);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const deleteUserLanguage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    const userLanguageToRemove = await languageRepository.findOneBy({ id });

    if (!userLanguageToRemove)
      return responseHandler.notFound(res, 'User language not found');

    await languageRepository.remove(userLanguageToRemove);

    return responseHandler.success(res, userLanguageToRemove);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

export default {
  addLanguage,
  deleteUserLanguage,
  getLanguages,
  getUserLanguages,
  updateLanguage,
  getPreferredUserLanguage,
};
