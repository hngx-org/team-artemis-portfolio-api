import { RequestHandler } from "express";
import { connectionSource } from "../database/data-source";
import { InterestDetail, User, Section } from "../database/entities";
import {
  InterestsInterface,
  updateInterestsInterface,
} from "../interfaces/interests.interface";

// Get the repository for the InterestDetail entity
const interestRepository = connectionSource.getRepository(InterestDetail);
const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);

export const createInterest: RequestHandler = async (req, res) => {
  try {
    // Get the data from the request body
    const { interests, userId, sectionId } = req.body as InterestsInterface;
    // Convert the interests array to a string
    const intrestsString = interests.toString();

    const user = await userRepository.findOne({ where: { id: userId } });
    const section = await sectionRepository.findOne({
      where: { id: sectionId },
    });

    // Check if the interest exists
    const interestExists = await interestRepository.findOne({
      where: { user },
    });

    // If the interest exists, return an error
    if (interestExists) {
      return res.status(409).json({
        successful: false,
        message: "This user already has an interest section created.",
      });
    }

    // Create the interest
    const interestResponse = interestRepository.create({
      interest: intrestsString,
      user,
      section,
    });
    // Save the interest to the database
    const data = await interestRepository.save(interestResponse);

    res.status(201).json({
      successful: true,
      message: "Interest created successfully",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      successful: false,
      message: "Could not create interest.",
      error: err.message,
    });
  }
};

export const updateInterest: RequestHandler = async (req, res) => {
  try {
    // Get the userId from the request params
    const { userId } = req.params;
    // Get the update data from the request body
    const { interests } = req.body as updateInterestsInterface;
    // Convert the interests array to a string
    const interestsString = interests.toString();

    const user = await userRepository.findOne({ where: { id: userId } });

    // Check if the interest exists
    const interestExists = await interestRepository.findOne({
      where: { user },
    });

    // If the interest does not exist, return an error
    if (!interestExists) {
      return res.status(404).json({
        successful: false,
        message: "Interest does not exist.",
      });
    }

    // Get the interest id
    const interestId = interestExists.id;

    // Update the interest
    await interestRepository.update(interestId, {
      interest: interestsString,
    });
    // Get the updated interest
    const data = await interestRepository.findOneBy({
      id: interestId,
    });
    // Convert the interests string to an array
    const interestArray = data?.interest.split(",");

    res.status(200).json({
      successful: true,
      message: "Interest updated successfully",
      data,
      interestArray,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      successful: false,
      message: "Could not update interest.",
      error: err.message,
    });
  }
};

export const deleteInterest: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userRepository.findOne({ where: { id: userId } });

    const interest = await interestRepository.findOne({ where: { user } });

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Interest does not exist.",
      });
    }

    const deletedInterest = await interestRepository.remove(interest);

    res.status(200).json({
      success: true,
      message: "Interest deleted successfully",
      deletedInterest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Could not delete interest.",
      error: err.message,
    });
  }
};

export const getInterests: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userRepository.findOne({ where: { id: userId } });

    const userIdRegex = /^[A-Fa-f0-9\-]+$/;
    if (!userIdRegex.test(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Retrieve interests from the database for the specific userId
    const interests = await interestRepository.findOne({
      where: { user },
    });
    const interestArray = interests.interest.split(",");
    res.status(200).json({
      successful: true,
      data: interests,
      interestArray,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      successful: false,
      message: "Could not retrieve interests.",
      error: err.message,
    });
  }
};
