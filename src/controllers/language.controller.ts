import { Request, RequestHandler, Response } from 'express';
import { connectionSource } from '../database/data-source';
import { User } from '../database/entities';
import { validate as isValidUUID } from 'uuid';
import responseHandler, {
  programmingLanguages,
} from '../services/language.service';
import axios from 'axios';

// const languageRepository = connectionSource.getRepository(Language);
const userRepository = connectionSource.getRepository(User);
const hostUrl = 'https://hng-u6fu.vercel.app';

const addLanguage: RequestHandler = async (req: Request, res: Response) => {
  try {
    let { userId, languages } = req.body;

    languages = languages.map((language: string) => language.toLowerCase());
    let checkLanguageArray = programmingLanguages.map((language) =>
      language.toLowerCase()
    );
    let misMatchFound = false;

    for (const language of languages) {
      if (!checkLanguageArray.includes(language)) {
        misMatchFound = true;
        break;
      }
    }

    if (misMatchFound)
      return responseHandler.badRequest(res, {error: "Language must be in the recommended list"});

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) return responseHandler.notFound(res, 'User not found');

    const result = await axios.post(`${hostUrl}/createLanguage`, {
      userId,
      languages,
    });

    responseHandler.success(res, result.data.data);
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

    const userLanguages = await axios.get(`${hostUrl}/getLanguages/${userId}`);

    return responseHandler.success(res, userLanguages.data.data);
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

    const userLanguages = await axios.delete(
      `${hostUrl}/deleteLanguages/${userId}`
    );

    return responseHandler.success(res, userLanguages.data.data);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

const getAllLanguages: RequestHandler = (req: Request, res: Response) => {
  try {
    return responseHandler.success(res, programmingLanguages);
  } catch (error) {
    return responseHandler.serverError(res, error.message);
  }
};

export default {
  addLanguage,
  getUserLanguages,
  deleteAllUserLanguages,
  getAllLanguages,
};
