import { Request, RequestHandler, Response } from 'express';
import { connectionSource } from '../database/data-source';
import { Language } from '../database/entity/model';
import { User } from '../database/entity/user';
import responseHandler from '../services/language.service';

const languageRepository = connectionSource.getRepository(Language);
const userRepository = connectionSource.getRepository(User);

const addLanguage: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { userId, languages } = req.body;

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) return responseHandler.notFound(res, 'User not found');

    await languageRepository.delete({ userId });

    Promise.all(
      languages.map(async (language: string) => {
        const userLanguage = new Language();
        userLanguage.userId = userId;
        userLanguage.language = language;
        await languageRepository.save(userLanguage);
      })
    );

    responseHandler.success(res, languages);
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

export default {
  addLanguage,
  getUserLanguages,
};
