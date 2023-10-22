import { RequestHandler } from "express";
import { connectionSource } from "../database/data-source";
import { InterestDetail, User, Section } from "../database/entities";
import {
  InterestsInterface,
  updateInterestsInterface,
} from "../interfaces/interests.interface";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../middlewares";

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

    if (!user || !section) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User or section does not exist, cannot create interest.",
      });
    }

    // Check if the interest exists
    const interestExists = await interestRepository.findOne({
      where: { user: { id: userId } },
    });

    // If the interest exists, delete the interest and create a new one
    if (interestExists) {
      await interestRepository.remove(interestExists);

      const newInterest = interestRepository.create({
        interest: intrestsString,
        user,
        section,
      });
      const savedInterest = await interestRepository.save(newInterest);

      // Create the data object to be returned
      const data = {
        interests: savedInterest.interest,
        user: {
          id: savedInterest.user?.id,
          name: `${savedInterest.user?.firstName} ${savedInterest.user?.lastName}`,
        },
        section: {
          id: savedInterest.section?.id,
          name: savedInterest.section?.name,
        },
      };

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Interest updated successfully",
        data,
      });
    }

    // Create the interest
    const interestResponse = interestRepository.create({
      interest: intrestsString,
      user,
      section,
    });
    // Save the interest to the database
    const savedInterest = await interestRepository.save(interestResponse);

    // Create the data object to be returned
    const data = {
      interests: savedInterest.interest,
      user: {
        id: savedInterest.user?.id,
        name: `${savedInterest.user?.firstName} ${savedInterest.user?.lastName}`,
      },
      section: {
        id: savedInterest.section?.id,
        name: savedInterest.section?.name,
      },
    };

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Interest created successfully",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      statusCode: 500,
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
      where: { user: { id: userId } },
    });

    // If the interest does not exist, return an error
    if (!interestExists) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
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
      success: true,
      statusCode: 200,
      message: "Interest updated successfully",
      data,
      interestArray,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Could not update interest.",
      error: err.message,
    });
  }
};

export const deleteInterest: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const interest = await interestRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!interest) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Interest section for this user not found.",
      });
    }

    const deletedInterest = await interestRepository.remove(interest);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Interest section deleted successfully",
      deletedInterest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Could not delete interest section.",
      error: err.message,
    });
  }
};

export const getInterests: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve interests from the database for the specific userId
    const interests = await interestRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!interests) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Interest(s) not found.",
      });
    }

    const interestArray = interests?.interest?.split(",");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Interest(s) retrieved successfully",
      data: interests,
      interestArray,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Could not retrieve interest(s).",
      error: err.message,
    });
  }
};
