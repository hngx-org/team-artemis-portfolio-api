import { NextFunction, Request, Response } from "express";
import { createAwardService } from "../services/award.service";
import { AwardData } from "../interfaces/";
import { connectionSource } from "../database/data-source";
import { NotFoundError } from "../middlewares";
import { QueryFailedError } from "typeorm";
import { Award } from "../database/entities/Award";
import { User } from "../database/entities/User";

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
      throw new CustomError(
        `Missing fields: ${missingFields.join(", ")}`,
        400
      );
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
  const awardRepo = connectionSource.getRepository(Award)

  try {
    const id = parseInt(req.params.id)
    const data = await awardRepo.findOne({
      where: { id },
      relations: ['user'],
    })

    if (!data) {
      return res.status(404).json({ message: 'Award not found' })
    }
    const { id: userId, firstName, lastName } = data.user
    const award = {
      title: data.title,
      year: data.year,
      presented_by: data.presented_by,
      url: data.url,
      description: data.description,
      user: {
        userId,
        firstName,
        lastName,
      },
    }
    res.status(200).json({
      message: 'Award retrieved successfully',
      award,
    })
  } catch (error) {
    console.error("Error getting award", error);
    res.status(500).json({ message: "Error getting awards" });
  }
}

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
    res.status(500).json({ message: "Error getting awards" });
  }
};

//Delete award by id
const deleteAwardController = async (req: Request, res: Response) => {
  const awardRepo = connectionSource.getRepository(Award);
  // Find award by id
  try {
    const id = parseInt(req.params.id);
    const award = await awardRepo.findOne({
      where: { id },
    });
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }
    //Delete the award
    await awardRepo.remove(award);

    res.status(200).json({
      message: "Award deleted successfully"
    
    });
  } catch (error) {
    console.error("Error deleting award", error);
    res.status(500).json({ message: "Error deleting awards" });
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

    const stringFields = [
      "year",
      "title",
      "description",
      "presented_by",
      "url",
    ];

    const isValidUrl = (url) => {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      return urlPattern.test(url);
    };

    for (const key in updateAward) {
      if (updateAward.hasOwnProperty(key)) {
        if (stringFields.includes(key)) {
          if (typeof updateAward[key] !== "string" || updateAward[key].trim() === "") {
            return res.status(400).json({ Error: `Field '${key}' should be a non-empty string` });
          }
          else if (key === "url") {
            const url = isValidUrl(updateAward[key])
            if (!url) {
              return res.status(400).json({ Error: `Field 'url' should be a valid URL` });
            }
          }
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

// Get award by UserId
const getAwardByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const awardRepo = connectionSource.getRepository(Award)

  try {
    const userId = req.params.userId
    const data = await awardRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    })

    if (!data) {
      throw new NotFoundError('Awards not found')
    }

    if (data.length === 0) {
      throw new NotFoundError('No awards found for the user')
    }

    const awards = data.map((award) => {
      const { id, firstName, lastName } = award.user
      return {
        title: award.title,
        year: award.year,
        presented_by: award.presented_by,
        url: award.url,
        description: award.description,
        user: {
          id,
          firstName,
          lastName,
        },
      }
    })
    res.status(200).json({
      message: 'Awards retrieved successfully',
      awards,
    })
  } catch (error) {
    return next(error)
  }
}

export {
  createAwardController,
  getAwardController,
  getAwardByUserId,
  getAllAwardsController,
  deleteAwardController,
  updateAwardController,
};
