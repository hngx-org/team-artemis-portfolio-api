import { Request, Response } from "express";
import { connectionSource } from "../database/data-source";
import { EducationDetail } from "../database/entity/model";

// Create an education detail
export const createEducationDetail = async (req: Request, res: Response) => {
    const {
      fieldOfStudy,
      school,
      from,
      to,
      description,
      degreeId,
      userId,
      sectionId,
    } = req.body;
  
    // Use the database connection to perform operations
    try {
      const educationRepository = connectionSource.getRepository(EducationDetail);
  
      // Create an EducationDetail instance with the provided data
      const educationDetail = educationRepository.create({
        fieldOfStudy,
        school,
        from,
        to,
        description,
        degreeId,
        userId,
        sectionId,
      });
  
      // Save the educationDetail to the database
      await educationRepository.save(educationDetail);
  
      res.status(201).json(educationDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create education detail" });
    }
  };
  

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
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete education detail" });
  }
};
