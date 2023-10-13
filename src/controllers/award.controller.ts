import { Award } from "../database/entity/model";
import { NextFunction, Request, Response } from "express";
import { createAwardService } from "../services/award.service";
import { AwardData } from "../interfaces/";
import { User } from "../database/entity/user";
import { connectionSource } from "../database/data-source";
import { NotFoundError } from "../middlewares";
import { QueryFailedError } from "typeorm";

// Controller function to create an award
const createAwardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const award: AwardData = req.body;
    award.user_id = userId;

    // Define an array of required fields
    const requiredFields = [
      "title",
      "year",
      "user_id",
      "presented_by",
      "url",
      "description",
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      // Create a CustomError with a 400 status code
      const err = new CustomError(
        `Missing fields: ${missingFields.join(", ")}`,
        400
      );
      res.status(err.statusCode).json({ err: err.message });
    }

    const userRepository = connectionSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      // Create a CustomError with a 404 status code
      const err = new NotFoundError("Error creating award: User not found");
      res.status(err.statusCode).json({ err: err.message });
    }
    console.log(award);

    const createdAward = await createAwardService(award);

    const response = {
      message: "Successfully created award",
      status: "success",
      statusCode: 201,
      createdAward,
    };
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error creating award:", error.message);
    next(error);
  }
};

// Get award by Id
const getAwardController = async (req: Request, res: Response) => {
  const awardRepo = connectionSource.getRepository(Award);
     
  try {
    const id = req.params.id;
    const award = await awardRepo.findOne({ where: { id } });
    
    if (!award) {
        return res.status(404).json({ message: "Award not found" });
    }

    res.status(200).json({
      message: "Award retrieved successfully",
      award,
    });
  } catch (error) {
    console.error("Error getting award", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all awards
const getAllAwardsController = async (req: Request, res: Response) => {
  const awardRepo = connectionSource.getRepository(Award);

  try {
    const awards = await awardRepo.find(); // Retrieve all awards

    res.status(200).json({
      message: "All awards retrieved successfully",
      awards,
    });
  } catch (error) {
    console.error("Error getting awards", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete award by id
const deleteAwardController = async (req: Request, res: Response) => {
  const awardRepo = connectionSource.getRepository(Award);
  // Find award by id
  try {
    const id = req.params.id;
    const award = await awardRepo.findOne({
      where: { id },
    });
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }
    //Delete the award
    await awardRepo.remove(award);

    res.status(200).json({
      message: "Award deleted successfully",
      award,
    });
  } catch (error) {
    console.error("Error deleting award", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update award
const updateAwardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const awardId = parseInt(req.params.awardId);

    const awardRepository = connectionSource.getRepository(Award);

    const award = await awardRepository.findOne({
      where: { id: awardId },
    });

    if (!award) {
      throw new NotFoundError("Award not found");
    }

    const updateAward = req.body;

    // fields that must be strings
    const stringFields = [
      "year",
      "title",
      "description",
      "presented_by",
      "url",
    ];

    // update the award dynamically based on the data passed
    for (const key in updateAward) {
      if (updateAward.hasOwnProperty(key)) {
        if (
          stringFields.includes(key) &&
          typeof updateAward[key] !== "string"
        ) {
          return res
            .status(400)
            .json({ "Input Error": `Field '${key}' should be a string` });
        }
        award[key] = updateAward[key];
      }
    }

    await awardRepository.save(award);

    console.log("Award updated successfully");

    res.status(200).json({
      message: "Award updated successfully",
      award,
    });
  } catch (error) {
    if (error instanceof QueryFailedError) {
      res.status(400).json({ "Input Error": error.message });
    }
    console.error("Error updating award details:", error.message);
    next(error);
  }
};

export {
  createAwardController,
  getAwardController,
  getAllAwardsController,
  deleteAwardController,
  updateAwardController,
};
