import { RequestHandler } from "express";
import { connectionSource } from "../database/data-source";
import { AboutDetail } from "../database/entity/model";
import { 
  AboutMeInterface, 
  updateAboutMeInterface 
} from '../interfaces/aboutme.interface';

const AboutRepository = connectionSource.getRepository(AboutDetail);

export const createAboutMe: RequestHandler = async (req, res) => {
  try {
    const { bio, userId, sectionId } = req.body as AboutMeInterface;

    const aboutMe = AboutRepository.create({ bio, userId, sectionId });
    const savedAboutMe = await AboutRepository.save(aboutMe);

    res.status(201).json({
      successful: true,
      message: 'About me created successfully',
      data: savedAboutMe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      successful: false,
      message: 'Could not create about me.',
      error: error.message,
    });
  }
};

export const getAboutMe: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const aboutMe = await AboutRepository.findOne({ where: { userId } });

    if (!aboutMe) {
      return res.status(404).json({ message: 'About me not found' });
    }

    res.status(200).json({
      successful: true,
      data: aboutMe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      successful: false,
      message: 'Could not retrieve about me.',
      error: error.message,
    });
  }
};

export const updateAboutMe: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio } = req.body as updateAboutMeInterface;

    const aboutMe = await AboutRepository.findOne({ where: { userId }  });

    if (!aboutMe) {
      return res.status(404).json({ message: 'About me not found' });
    }

    aboutMe.bio = bio;

    await AboutRepository.save(aboutMe);

    res.status(200).json({
      successful: true,
      message: 'About me updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      successful: false,
      message: 'Could not update about me.',
      error: error.message,
    });
  }
};

export const deleteAboutMe: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const aboutMe = await AboutRepository.findOne({ where: { userId } });

    if (!aboutMe) {
      return res.status(404).json({ message: 'About me not found' });
    }

    await AboutRepository.remove(aboutMe);

    res.status(200).json({
      successful: true,
      message: 'About me deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      successful: false,
      message: 'Could not delete about me.',
      error: error.message,
    });
  }
};