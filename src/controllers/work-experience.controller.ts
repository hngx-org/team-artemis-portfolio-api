import { RequestHandler } from "express";
import { error, success } from "../utils";
import { connectionSource } from "../database/data-source";
import { WorkExperienceDetail } from "../database/entity/model";

// Define a Data Transfer Object (DTO) for adding WorkExperienceDetail
export interface WorkExperienceDTO {
  role?: string;
  company?: string;
  description?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  isEmployee?: boolean;
  userId?: string;
  sectionId?: number;
}

// Get the repository for the WorkExperienceDetail entity
const workExperienceRepository =
  connectionSource.getRepository(WorkExperienceDetail);

export const addWorkExperience: RequestHandler = async (req, res, next) => {
  try {
    // Validate and apply updates from the DTO
    const workExperienceData = req.body as WorkExperienceDTO;

    // Create a new work experience detail
    const workExperience = workExperienceRepository.create(workExperienceData);

    // Save the new work experience detail
    const data = await workExperienceRepository.save(workExperience);

    success(res, data, "Work Experience Added");
  } catch (err) {
    console.log(err);
    error(res, (err as Error).message);
  }
};

export const deleteWorkExperience: RequestHandler = async (req, res, next) => {
  try {
    // Convert the ID to a number
    const id = parseInt(req.params.id);

    // Find the existing work experience detail by ID
    const workExperienceToRemove = await workExperienceRepository.findOneBy({
      id: id,
    });

    // If the work experience detail doesn't exist, return a 404 Not Found
    if (!workExperienceToRemove) {
      return error(res, "Work Experience not found", 404);
    }

    // Delete the work experience detail
    const data = await workExperienceRepository.remove(workExperienceToRemove);

    success(res, data, "Work Experience Deleted");
  } catch (err) {
    console.log(err);
    error(res, (err as Error).message);
  }
};
