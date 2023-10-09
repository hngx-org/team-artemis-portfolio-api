import { Request, Response } from "express";
import { connectionSource as dataSource } from "../database/data-source";
import { SocialUser } from "../database/entity/model";
import { SocialUserService } from "../services/contact.service";

const contactsRepo = dataSource.getRepository(SocialUser);
const socialUserService = new SocialUserService();

export const createContacts = async (req: Request, res: Response) => {
  try {
    const { url, user_id, social_media_id } = req.body;
    const contactsRepo = dataSource.getRepository(SocialUser);
    const contact = contactsRepo.create({
      url,
      userId: user_id,
      socialMediaId: social_media_id,
    });
    await contactsRepo.save(contact);
    return res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(400).json({ message: "Invalid input data" });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const userIdRegex = /^[a-zA-Z0-9]+$/;
    if (!userIdRegex.test(user_id)) {
      return res.status(400).json({ message: "Invalid user_id format" });
    }

    const contacts = await contactsRepo.find({
      where: { userId: String(user_id) },
    });
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    return res.status(404).json({ message: "Contacts not found" });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const socialUserIdString = req.params.id;
    const socialUserId = parseInt(socialUserIdString, 10);

    if (isNaN(socialUserId)) {
      return res.status(400).json({ message: "Invalid socialUserId" });
    }

    await socialUserService.deleteContact(socialUserId);

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);

    if (error.message === "Social User not found") {
      return res.status(404).json({ message: "Social User not found" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
