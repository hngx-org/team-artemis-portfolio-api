import { Request, Response } from "express";
import { Section } from "../database/entity/model";
import { connectionSource } from "../database/data-source";

const sectionRepository = connectionSource.getRepository(Section);

class SectionPositionController {
  static sections: Section[] = []; // In-memory array to store section positions

  static async storeSectionPositions(req: Request, res: Response) {
    try {
      const sectionData  = req.body;
        console.log(sectionData);

      const existingSections = await sectionRepository.find();
      if (existingSections.length === 0) {
        // If no existing sections, set the position to 1
        sectionData.forEach((section) => {
          section.position = 1;
        });
      } else {
        // Find the highest position among existing sections and increment it
        const highestPosition = Math.max(
          ...existingSections.map((s) => s.position)
        );
        sectionData.forEach((section) => {
          section.position = highestPosition + 1;
        });
      }

      const section = sectionRepository.create(sectionData);
      const savedSection = await sectionRepository.save(section);

      return res.json({ message: "Section positions stored successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  }

  static async retrieveSectionPositions(req: Request, res: Response) {
    try {
      const sectionPositions = await sectionRepository.find();

      if (!sectionPositions) {
        return res.status(404).json({ error: "No sections found" });
      } else {
        return res.json({ sectionPositions });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export { SectionPositionController };
