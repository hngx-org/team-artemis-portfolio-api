import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Section } from "../database/entity/model";
import { error, success } from "../utils";

export const updateCustomSection = async (req: Request, res: Response) => {
  try {
    const { sectionId } = req.params;
    const { name, description, meta } = req.body;

    const sectionRepository = getRepository(Section);

    const customSection = await sectionRepository.findOne(sectionId);

    // Check if the section exists
    if (!customSection) {
      return res.status(404).json({ message: "Custom section not found" });
    }

    customSection.name = name;
    customSection.description = description;
    customSection.meta = meta;

    // Save the updated section
    await sectionRepository.save(customSection);

    success(res, { message: "Custom section updated successfully" });
  } catch (err) {
    error(res, (err as Error).message);
  }
};
