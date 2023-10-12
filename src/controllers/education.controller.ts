import { Request, RequestHandler, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { EducationDetail } from "../database/entity/model";
import { createEducationDetail } from "../services/education.service";
import { EducationDetailData } from "../interfaces/education.interface";
import { User } from "../database/entity/user";

import {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  errorHandler,
} from "../middlewares";

// Endpoint to fetch the education section
const fetchUserEducationDetail: RequestHandler = async (req, res, next) => {
  // Add 'next' parameter
  const educationRepository = connectionSource.getRepository(EducationDetail);

  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("User ID is required");
    }

    try {
      const educationDetails = await educationRepository.find({
        where: { userId: id },
        // Relationship has not been modeled yet... Uncomment the code once the relationship between education detail and degree, section, and user tables have been established
        // relations: ["degree", "section", "user"],
      });

      // Send a success response
      res.status(200).json({ educationDetails });
    } catch (error) {
      // Handle the database query error (e.g., QueryFailedError)
      console.log("Error fetching education details:", error.message);
      const customError = new CustomError(error.message, 500);
      res.status(customError.statusCode).json({ err: customError.message });
      next(customError); // Pass the custom error to the error handler
    }
  } catch (error) {
    // Handle other types of errors or pass them to the error handler
    next(error);
  }
};

// Get the repository for the EducationDetail entity
const educationDetailRepository =
  connectionSource.getRepository(EducationDetail);

const createEducationDetailController = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const { degreeId, fieldOfStudy, school, from, description, to, sectionId } =
      req.body as EducationDetailData;

    // Define an array of required fields
    const requiredFields = [
      "degreeId",
      "fieldOfStudy",
      "school",
      "from",
      "description",
      "to",
      "sectionId",
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

    // Get the user by userId
    const userRepository = connectionSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      // Create a CustomError with a 404 status code
      const err = new NotFoundError(
        "Error creating education detail: User not found"
      );
      res.status(err.statusCode).json({ err: err.message });
    }

    // Call the service function to create an education detail
    const educationDetail = await createEducationDetail({
      degreeId,
      fieldOfStudy,
      school,
      from,
      description,
      to,
      userId,
      sectionId,
    });

    const response = {
      message: "Successfully created education detail",
      status: "success",
      statusCode: 201,
      educationDetail,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating education detail:", error.message);
    next(error);
  }
};

// get education detail by id
const getEducationDetailById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      const err = new BadRequestError("Invalid ID Format");
      return res.status(err.statusCode).json({ error: err.message });
    }

    // Attempt to fetch education details
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    // If the education detail is not found, you can throw a NotFoundError
    if (!educationDetail) {
      const err = new NotFoundError("Education detail not found");
      throw JSON.stringify(err);
    }

    // Send a success response
    res.status(200).json({ educationDetail });
  } catch (error) {
    console.error("Error fetching education detail:", error.message);
    next(error);
  }
};

const updateEducationDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      const err = new BadRequestError("Invalid ID Format");
      return res.status(err.statusCode).json({ error: err.message });
    }

    // convert the date objects to date strings
    if (req.body.from && req.body.to) {
      req.body.from = new Date(req.body.from);
      req.body.to = new Date(req.body.to);
    }

    if (!req.body) {
      const err = new BadRequestError("No data provided");
      res.status(err.statusCode).json({ err: err.message });
      throw JSON.stringify(err);
    }

    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    if (!educationDetail) {
      const err = new NotFoundError("Education detail not found");
      res.status(err.statusCode).json({ err: err.message });
    }

    const updateData = req.body;

    // Dynamic updates based on the updateData object
    for (const key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        educationDetail[key] = updateData[key];
      }
    }

    // Save the updated education detail
    await educationDetailRepository.save(educationDetail);

    console.log("Education detail updated successfully");

    res.status(200).json({
      message: "Education detail updated successfully",
      educationDetail,
    });
  } catch (error) {
    console.error("Error updating education detail:", error.message);
    next(error);
  }
};

// Delete Education Controller
const deleteEducationDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      const err = new BadRequestError("Invalid ID Format");
      return res.status(err.statusCode).json({ error: err.message });
    }

    // Find the existing education detail by ID
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    if (!educationDetail) {
      const err = new NotFoundError("Education detail not found");
      res.status(err.statusCode).json({ err: err.message });
    }

    await educationDetailRepository.remove(educationDetail);

    res.status(204).json({
      message: "Education detail deleted successfully",
      educationDetail,
    });
    console.log("Education detail deleted successfully");
  } catch (error) {
    console.error("Error deleting education detail:", error);
    // errorHandler(error, req, res, next);
    next(error);
  }
};

export {
  createEducationDetailController,
  updateEducationDetail,
  getEducationDetailById,
  deleteEducationDetail,
  fetchUserEducationDetail,
};
