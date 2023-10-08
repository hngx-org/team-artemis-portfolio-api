import { Request, RequestHandler, Response } from "express";
import { connectionSource } from "../database/data-source";
import { EducationDetail } from "../database/entity/model";
import { createEducationDetail } from "../services/education.service";

// Endpoint to fetch the education section
const fetchEducationSection: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;

    const educationRepository = connectionSource.getRepository(EducationDetail);

    const educationDetails = await educationRepository.find({
      where: { userId },
      relations: ["degree", "section", "user"],
    });

    res.status(200).json(educationDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a Data Transfer Object (DTO) for updating EducationDetail
export interface UpdateEducationDetailDTO {
  fieldOfStudy?: string;
  school?: string;
  from?: string;
  to?: string;
  description?: string;
  degreeId?: number;
  userId?: string;
  sectionId?: number;
}

// Get the repository for the EducationDetail entity
const educationDetailRepository =
  connectionSource.getRepository(EducationDetail);

const createEducationDetailController = async (req: Request, res: Response) => {
  try {
    const {
      degreeId,
      fieldOfStudy,
      school,
      from,
      description,
      to,
      userId,
      sectionId,
    } = req.body;

    // Define an array of required fields
    const requiredFields = [
      "degreeId",
      "fieldOfStudy",
      "school",
      "from",
      "description",
      "to",
      "userId",
      "sectionId",
    ];
    // Add more fields as needed

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `The following fields are missing: ${missingFields.join(", ")}`,
      });
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

    // Return the created education detail as a JSON response
    res.status(201).json({ educationDetail });
  } catch (error) {
    console.error("Error creating education detail:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateEducationDetail = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    console.log("starting");

    // Find the existing education detail by ID
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });
    console.log("almost found");

    if (!educationDetail) {
      return res.status(404).json({ message: "Education not found" });
    }

    console.log("found");

    // Validate and apply updates from the DTO
    const updateData = req.body as UpdateEducationDetailDTO;

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
    console.error("Error updating education detail:", error);

    if (error instanceof SyntaxError) {
      // Handle JSON parsing error
      return res
        .status(400)
        .json({ message: "Invalid JSON format in request body" });
    } else if (error.code === "23505") {
      // Handle duplicate key constraint violation (unique constraint violation)
      return res
        .status(409)
        .json({ message: "Duplicate key value in the database" });
    } else if (error.code === "22P02") {
      // Handle invalid integer format error
      return res.status(400).json({ message: "Invalid ID format" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createEducationDetailController,
  updateEducationDetail,
  fetchEducationSection,
};
