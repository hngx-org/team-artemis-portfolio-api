import { Request, RequestHandler, Response } from 'express';
import { connectionSource } from '../database/data-source';
import { User } from '../database/entities';
import { validate as isValidUUID } from 'uuid';
import responseHandler from '../services/language.service';
import axios from 'axios';

// const languageRepository = connectionSource.getRepository(Language);
const userRepository = connectionSource.getRepository(User);
const hostUrl = 'https://hng-u6fu.vercel.app';

const addLanguage: RequestHandler = async (req: Request, res: Response) => {
  try {
    let { userId, languages } = req.body;

    languages = languages.map((language: string) => language.toLowerCase());

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

    console.log(userLanguages);

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
export default {
  addLanguage,
  getUserLanguages,
  deleteAllUserLanguages,
};
