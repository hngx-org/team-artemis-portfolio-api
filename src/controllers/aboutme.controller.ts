import { RequestHandler } from "express";
import { connectionSource } from "../database/data-source";
import { AboutDetail, User, Section } from "../database/entities";
import { 
  AboutMeInterface, 
  updateAboutMeInterface 
} from '../interfaces/aboutme.interface';

const AboutRepository = connectionSource.getRepository(AboutDetail);
const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);


export const createAboutMe: RequestHandler = async (req, res) => {
  try {
    // Get the data from the request body
    const { bio, userId, sectionId } = req.body as AboutMeInterface;

    const user = await userRepository.findOne({
      where: { id: userId },
    });
    const section = await sectionRepository.findOne({
      where: { id: sectionId }
    });

    if (!user || !section) {
      return res.status(404).json({
        successful: false,
        message: "User or section does not exist.",
      });
    }

    // Check if the bio exists
    const aboutMeExists = await AboutRepository.findOne({
      where: { user },
    });

    // If the about me exists, delete the bio and create a new one
    if (aboutMeExists) {
      await AboutRepository.remove(aboutMeExists);

      const newaboutMe = AboutRepository.create({
        bio,
        user,
        section,
      });
      const savedaboutMe = await AboutRepository.save(newaboutMe);

      // Extract the userId, sectionId and sectionName from the savedaboutMe
      const user_id = savedaboutMe.user?.id;
      const section_id = savedaboutMe.section?.id;
      const section_name = savedaboutMe.section?.name;
      const sectionDetails = { section_id, section_name };

      // Create the data object to be returned
      const data = {
        bio: savedaboutMe.bio,
        user_id,
        sectionDetails,
      };

      return res.status(200).json({
        successful: true,
        message: "Bio updated successfully",
        data,
      });
    }

    // Create the Bio
    const aboutMeResponse = AboutRepository.create({
      bio,
      user,
      section,
    });
    // Save the About Me to the database
    const savedaboutMe = await AboutRepository.save(aboutMeResponse);
    console.log("Saved bio", savedaboutMe);

    // Extract the userId, sectionId and sectionName from the savedaboutMe
    const user_id = savedaboutMe.user?.id;
    const section_id = savedaboutMe.section?.id;
    const section_name = savedaboutMe.section?.name;
    const sectionDetails = { section_id, section_name };

    // Create the data object to be returned
    const data = {
      bio: savedaboutMe.bio,
      user_id,
      sectionDetails,
    };

    res.status(201).json({
      successful: true,
      message: "Bio created successfully",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      successful: false,
      message: "Could not create bio.",
      error: err.message,
    });
  }
};

export const getAboutMe: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'About me not found' });
    }

    // Retrieve interests from the database for the specific userId
    const bio = await AboutRepository.findOne({
      where: { user },
    });

    res.status(200).json({
      successful: true,
      data: bio,
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

    const user = await userRepository.findOne({ where: { id: userId }  });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the AboutMe entity for the given user
    const aboutMe = await AboutRepository.findOne({ where: { user } });

    if (!aboutMe) {
      return res.status(404).json({ message: 'About Me data does not exist' });
    }

    // Update the AboutMe bio
    aboutMe.bio = bio;

    // Save the updated AboutMe data
    await AboutRepository.save(aboutMe);

    res.status(200).json({
      successful: true,
      message: 'About Me updated successfully',
      data: aboutMe.bio,  // Return the updated bio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      successful: false,
      message: 'Could not update About Me.',
      error: error.message,
    });
  }
};

export const deleteAboutMe: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the AboutMe entity associated with the user
    const aboutMe = await AboutRepository.findOne({ where: { user } });

    if (!aboutMe) {
      return res.status(404).json({ message: 'About me not found' });
    }

    // Remove the AboutMe entity from the database
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