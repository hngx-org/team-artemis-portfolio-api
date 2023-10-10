import { updateContact, findUser } from "../services";
import { ContactBody } from "../interfaces";
import { Request, Response, RequestHandler, NextFunction } from "express";

export const updateContactController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { socialMediaId, url, userId }: ContactBody = req.body;
    const socialId: number = Number(req.params.Id);

    const user = await findUser(userId);

    if (!user) {
      return res.status(404).json("user not found");
    }

    const contact = await updateContact(socialMediaId, url, socialId, userId);

    if (!contact) {
      return res.status(404).json("can not update contact");
    }

    return res.status(200).json({
      message: "new contact updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};
