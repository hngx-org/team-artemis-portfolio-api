import { RequestHandler } from "express";
import { Degree, EducationDetail, Section } from "../database/entity/model";
import { connectionSource } from "../database/data-source";

export const fetchEducationSection: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const educationRepository = connectionSource.getRepository(EducationDetail);
    const sectionRepository = connectionSource.getRepository(Section);
    const degreeRepository = connectionSource.getRepository(Degree);

    const educationDetails = await educationRepository.find({
      where: { userId },
      relations: ["degree"],
    });

    res.status(200).json({});
  } catch (error) {}
};
