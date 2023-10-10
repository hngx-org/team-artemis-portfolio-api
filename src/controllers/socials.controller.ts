import { Request, Response } from "express";
import { connectionSource as dataSource } from "../database/data-source";
import { SocialMedia} from "../database/entity/model";

export const createSocials = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      
      const contactsRepo = dataSource.getRepository(SocialMedia);
      const contact = contactsRepo.create({
        name
        
      });
      await contactsRepo.save(contact);
      return res.status(201).json({ message: "Social Media type created successfully" });
    } catch (error) {
      console.error("Error creating contact:", error);
      return res.status(400).json({ message: "Invalid input data" });
    }
  };