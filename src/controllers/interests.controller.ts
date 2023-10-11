import { RequestHandler } from "express";
import { connectionSource } from "../database/data-source";
import { InterestDetail } from "../database/entity/model";
import { InterestsInterface } from "../interfaces/interests.interface";

// Get the repository for the InterestDetail entity
const interestRepository = connectionSource.getRepository(InterestDetail);

export const createInterest: RequestHandler = async (req, res) => {
  try {
    // Get the data from the request body
    const { interests, userId, sectionId } = req.body as InterestsInterface;
    // Convert the interests array to a string
    const intrestsString = interests.toString();

    // Create the interest
    const interestResponse = interestRepository.create({
      interest: intrestsString,
      userId,
      sectionId,
    });
    // Save the interest to the database
    const data = await interestRepository.save(interestResponse);

    res
      .status(201)
      .json({
        successful: true,
        message: "Interest created successfully",
        data,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        successful: false,
        message: "Could not create interest.",
        error: err.message,
      });
  }
};
