import { Request, Response } from "express";
import { connectionSource } from "../database/data-source";
import { EducationDetail } from "../database/entity/model";

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

export const updateEducationDetail = async (req: Request, res: Response) => {
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
