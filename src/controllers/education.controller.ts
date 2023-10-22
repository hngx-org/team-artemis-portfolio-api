import { Request, RequestHandler, Response, NextFunction } from "express";
import { v4 as uuidv4, validate as isUUID } from "uuid";

import { connectionSource } from "../database/data-source";
import { Degree, EducationDetail, Section, User } from "../database/entities";
import {
  createEducationDetail,
  updateEducationDetailID,
} from "../services/education.service";
import { EducationDetailData } from "../interfaces/education.interface";

import {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  errorHandler,
  UnprocessableEntityError,
} from "../middlewares";

import {
  CreateEducationDetailDataSchema,
  validateCreateData,
} from "../middlewares/education.zod";

const educationDetailRepository =
  connectionSource.getRepository(EducationDetail);
const userRepository = connectionSource.getRepository(User);

// Custom function to validate date strings in "yy-mm-dd" format
function validateYear(dateString: string) {
  const yearPattern = /^\d{4}$/;
  console.log("dateString", dateString);
  return yearPattern.test(dateString);
}

// Endpoint to fetch the education section
const fetchUserEducationDetail: RequestHandler = async (req, res, next) => {
  // Add 'next' parameter

  try {
    const user_id = req.params.id;

    if (!user_id) {
      throw new BadRequestError("User ID is required");
    }

    let user: User;

    if (isUUID(user_id)) {
      user = await userRepository.findOne({ where: { id: user_id } });
    } else {
      user = await userRepository.findOne({ where: { slug: user_id } });
    }

    if (!user) {
      const error = new NotFoundError("A user with this ID does not exist");
      throw error;
    }

    const educationDetails = await educationDetailRepository.find({
      where: { user: { id: user.id } },
      relations: ["degree"],
    });

    if (!educationDetails) {
      const error = new InternalServerError(
        "An error occurred while fetching the education details, please try again"
      );
      throw error;
    }

    // Send a success response
    res.status(200).json({ educationDetails });
  } catch (error) {
    // Handle errors
    if (error.message.includes("invalid input syntax for type uuid")) {
      error.message = "Invalid UUID format. Please provide a valid UUID.";
    }
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "An unknown error occurred" });
    next(error);
  }
};

// Get the repository for the EducationDetail entity

const createEducationDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.params.id;

    const {
      degree_id,
      fieldOfStudy,
      school,
      from,
      description,
      to,
      section_id,
    } = req.body as EducationDetailData;

    const data = {
      degree_id,
      fieldOfStudy,
      school,
      from,
      description,
      to,
      section_id,
    };

    // Validate date strings in "yy-mm-dd" format
    if (data.from && !validateYear(data.from)) {
      // return res.status(400).json({ errors: "Invalid 'from' date format" });
      throw new BadRequestError("Invalid 'from' date format");
    }
    
      if (data.to && !validateYear(data.to) && data.to.toLocaleLowerCase() !=='present') {
        throw new BadRequestError("Invalid 'to' date format");
        // return res.status(400).json({ errors: "Invalid 'to' date format" });
      }

    

    await validateCreateData(data, user_id, res, next);

    if (!isNaN(Number(fieldOfStudy))) {
      throw new UnprocessableEntityError("field Of Study should be a string");
    }

    if (!isNaN(Number(school))) {
      throw new UnprocessableEntityError("school should be a string");
    }

    if (!isNaN(Number(description))) {
      throw new UnprocessableEntityError("description should be a string");
    }

    const pattern = /^[a-zA-Z0-9 ,.]+$/;

    if (!pattern.test(fieldOfStudy)) {
      throw new UnprocessableEntityError(
        "field Of Study should not contain sepecial characters"
      );
    }
    if (!pattern.test(school)) {
      throw new UnprocessableEntityError(
        "school should not contain sepecial characters"
      );
    }
    if (!pattern.test(description)) {
      throw new UnprocessableEntityError(
        "description should not contain sepecial characters"
      );
    }

    // check if the from date is less than the to date
    if (data.from && data.to && (data.to.toLocaleLowerCase() !== 'present')) {
      const fromDate = parseInt(data.from);
      const toDate = parseInt(data.to);
      if (fromDate > toDate) {
        throw new BadRequestError(
          "The 'from' date cannot be greater than the 'to' date"
        );
      }
    }

    // Define an array of required fields
    const requiredFields = [
      "degree_id",
      "fieldOfStudy",
      "school",
      "from",
      "description",
      "to",
      "section_id",
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing fields: ${missingFields.join(", ")}`);
    }

    // Get the user by userId
    const userRepository = connectionSource.getRepository(User);

    let user: User;

    if (isUUID(user_id)) {
      user = await userRepository.findOne({ where: { id: user_id } });
    } else {
      user = await userRepository.findOne({ where: { slug: user_id } });
    }

    const sectionRepository = connectionSource.getRepository(Section);
    const degreeRepository = connectionSource.getRepository(Degree);

    const section = await sectionRepository.findOne({
      where: { id: section_id },
    });
    const degree = await degreeRepository.findOne({ where: { id: degree_id } });

    if (!user) {
      throw new NotFoundError(
        "Error creating education detail: User not found"
      );
    }
    if (!section) {
      throw new NotFoundError(
        "Error creating education detail: Section not found"
      );
    }
    if (!degree) {
      throw new NotFoundError(
        "Error creating education detail: Degree not found"
      );
    }

    // Call the service function to create an education detail
    const educationDetail = await createEducationDetail({
      degree_id,
      fieldOfStudy,
      school,
      from,
      description,
      to,
      user_id,
      section_id,
    });

    const response = {
      message: "Successfully created education detail",
      status: "success",
      statusCode: 201,
      educationDetail,
    };

    return res.status(201).json(response);
  } catch (error) {
    return next(error);
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
      throw new BadRequestError("Invalid ID Format");
    }

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

const updateEducationDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      throw new BadRequestError("Invalid ID Format");
    }

    if (!req.body) {
      throw new BadRequestError("No data provided");
    }

    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    if (!educationDetail) {
      throw new NotFoundError("Education detail not found");
    }

    const updateData = req.body;

    // Dynamic updates based on the updateData object
    for (const key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        educationDetail[key] = updateData[key];
      }
    }

    // Save the updated education detail
    const result = await updateEducationDetailID(
      educationDetail.id,
      updateData,
      next
    );

    res.status(200).json({
      message: "Education detail updated successfully",
      educationDetail: result,
      success: true,
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
      throw new BadRequestError("Invalid ID Format");
    }

    // Find the existing education detail by ID
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    if (!educationDetail) {
      throw new NotFoundError("Education detail not found");
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
