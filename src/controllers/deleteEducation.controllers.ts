import { Request, Response } from "express";
import { connectionSource } from "../database/data-source";
import { EducationDetail } from "../database/entity/model";

// Delete an education detail by ID
export const deleteEducationDetail = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  // Use the database connection to perform operations
  try {
    const educationRepository = connectionSource.getRepository(EducationDetail);

    const educationDetail = await educationRepository.findOne({
        where: { id },
    });

    if (!educationDetail) {
      res.status(404).json({ error: "Education detail not found" });
    } else {
      await educationRepository.remove(educationDetail);
      res.status(204).send({message: "education detail deleted successfully"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete education detail" });
  }
};
