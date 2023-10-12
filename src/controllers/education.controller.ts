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
  QueryFailedError,
} from "../middlewares";

// Endpoint to fetch the education section
const fetchUserEducationDetail: RequestHandler = async (req, res, next) => {
  // Add 'next' parameter
  const educationRepository = connectionSource.getRepository(EducationDetail);
  const userRepository = connectionSource.getRepository(User);

  try {
    const id = req.params.id;

    if (!id) {
      throw new BadRequestError("User ID is required");
    }

    const isUser = await userRepository.findOne({ where: { id } });

    if (!isUser) {
      const error = new NotFoundError("A user with this ID does not exist");
      throw error;
    }

    const educationDetails = await educationRepository.find({
      where: { userId: id },
      relations: ["degree", "section", "user"],
    });

    // Send a success response
    res.status(200).json({ educationDetails });
  } catch (error) {
    // Handle other types of errors or pass them to the error handler
    res.status(error.statusCode || 500).json({ error: error.message });
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

    // Attempt to fetch education details
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    // If the education detail is not found, you can throw a NotFoundError
    if (!educationDetail) {
      throw new NotFoundError("Education detail not found");
    }

    // Send a success response
    res.status(200).json({ educationDetail });
  } catch (error) {
    console.error("Error fetching education detail:", error.message);
    next(error);
  }
};

// Update Education Controller
const updateEducationDetail = async (req: Request, res: Response, next) => {
  try {
    const id = parseInt(req.params.id);

    // Find the existing education detail by ID
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    if (!educationDetail) {
      const err = new NotFoundError("Education not found");
      res.status(err.statusCode).json({ err: err.message });
    }

    // Validate and apply updates from the DTO
    const updateData = req.body as EducationDetailData;

    if (updateData.fieldOfStudy)
      educationDetail.fieldOfStudy = updateData.fieldOfStudy;
    if (updateData.school) educationDetail.school = updateData.school;
    if (updateData.from) educationDetail.from = updateData.from;
    if (updateData.to) educationDetail.to = updateData.to;
    if (updateData.description)
      educationDetail.description = updateData.description;
    if (updateData.degreeId) educationDetail.degreeId = updateData.degreeId;
    if (updateData.userId) educationDetail.userId = updateData.userId;
    if (updateData.sectionId) educationDetail.sectionId = updateData.sectionId;

    // Save the updated education detail
    await educationDetailRepository.save(educationDetail);

    res.status(200).json({
      message: "Education detail updated successfully",
      educationDetail,
    });
  } catch (error) {
    const err = new InternalServerError(
      "Error updating education detail: Internal server error"
    );
    res.status(err.statusCode).json({ err: err.message });

    next(error);
  }
};

// Delete Education Controller
const deleteEducationDetail = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    // Find the existing education detail by ID
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    if (!educationDetail) {
      console.log("Education not found");
      return res.status(404).json({ message: "Education not found" });
    }

    // Delete the education detail
    await educationDetailRepository.remove(educationDetail);

    res.status(204).json({
      message: "Education detail deleted successfully",
      educationDetail,
    });
    console.log("Education detail deleted successfully");
  } catch (error) {
    console.error("Error deleting education detail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createEducationDetailController,
  updateEducationDetail,
  getEducationDetailById,
  deleteEducationDetail,
  fetchUserEducationDetail,
};
