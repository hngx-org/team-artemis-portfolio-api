import express from "express";
import { error, success } from "../utils";
import { cloudinaryService, uploadProfileImageService } from "../services";
import { connectionSource } from "../database/data-source";
import { PortfolioDetails } from "../database/entity/model";

// Define a Data Transfer Object (DTO) for updating PortfolioDetails
export interface UpdatePortfolioDetailsDTO {
  name?: string;
  city?: string;
  country?: string;
}

// Get the repository for the PortfolioDetails entity
const portfolioDetailsRepository =
  connectionSource.getRepository(PortfolioDetails);

// Export the uploadProfileImageController function
export const uploadProfileImageController: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.files) return error(res, "add event image", 400);
    const { service, userId } = req.body;

    const { urls } = await cloudinaryService(req.files, service);
    const data = await uploadProfileImageService(userId, urls);
    return success(res, data, "Profile picture uploaded successfully");
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};

// Export the updatePortfolioDetails function
export const updatePortfolioDetails: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = parseInt(req.params.id);

    // Find the existing portfolio details by ID
    const portfolioDetails = await portfolioDetailsRepository.findOne({
      where: { id },
    });

    if (!portfolioDetails) {
      return res.status(404).json({ message: "Portfolio details not found" });
    }

    // Validate and apply updates from the DTO
    const updateData = req.body as UpdatePortfolioDetailsDTO;

    // if (updateData.name) portfolioDetails.name = updateData.name;
    if (updateData.city) portfolioDetails.city = updateData.city;
    if (updateData.country) portfolioDetails.country = updateData.country;

    // Save the updated portfolio details
    await portfolioDetailsRepository.save(portfolioDetails);

    res.status(200).json({
      message: "Portfolio details updated successfully",
      portfolioDetails,
    });
  } catch (error) {
    console.error("Error updating portfolio details:", error);

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
