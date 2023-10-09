import { Request, RequestHandler, Response } from "express";
import { connectionSource } from "../database/data-source";
import { EducationDetail } from "../database/entity/model";
import { createEducationDetail } from "../services/education.service";
import { EducationDetailData } from "../interfaces/education.interface";

// Endpoint to fetch the education section
const fetchEducationDetail: RequestHandler = async (req, res) => {
  const educationRepository = connectionSource.getRepository(EducationDetail);

  try {
    const id = req.params.id;

    const educationDetails = await educationRepository.find({
      where: { userId: id },
      // Relationship has not been modelled yet... Uncomment the code once the relationship between education detail and degree, section and user table have been established
      // relations: ["degree", "section", "user"],
    });

    res.status(200).json({ educationDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
    } = req.body as EducationDetailData;

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
    console.log("start");

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

// Get education detail by ID
const getEducationDetailById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    // Find the education detail in the database
    const educationDetail = await educationDetailRepository.findOne({
      where: { id },
    });

    if (!educationDetail) {
      return res.status(404).json({ message: "Education not found" });
    }

    // Return the education detail as a JSON object
    res.status(200).json({ educationDetail });
  } catch (error) {
    console.error("Error fetching education detail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all education details attached to a user
const getAllEducationDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Find all education details in the database
    const educationDetails = await educationDetailRepository.find({
      where: { userId },
    });

    if (!educationDetails) {
      return res
        .status(404)
        .json({ message: "This user has no Educational Details" });
    }

    // Return the education details as a JSON array
    res.status(200).json({ educationDetails });
  } catch (error) {
    console.error("Error fetching education details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Education Controller
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
  getAllEducationDetails,
  deleteEducationDetail,
  fetchEducationDetail,
};
