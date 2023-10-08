import { updateContact, deleteContact, findUser } from "../services";
import { error, success } from "../utils/response.util";
import { ContactBody } from "../interfaces";
import { Request, Response, RequestHandler } from "express";

export const updateContactController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { socialMediaId, url, userId }: ContactBody = req.body;
    const socialId: number = Number(req.params.Id);

    const user = await findUser(userId);

    if (!user) {
      return error(
        res,
        "User not found: The requested user does not exist.",
        404
      );
    }

    const contact = await updateContact(socialMediaId, url, socialId, userId);

    if (contact === null) {
      return error(
        res,
        "Contact not updated: The requested contact could not be updated.",
        500
      );
    }

    return success(res, contact, "Contact updated successfully");
  } catch (error) {
    error(res, (error as Error).message);
  }
};

export const deleteContactController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userId }: ContactBody = req.body;
  const socialId: number = Number(req.params.Id);
  const user = await findUser(userId);

  if (!user) {
    return error(
      res,
      "User not found: The requested user does not exist.",
      404
    );
  }
  const contact = await deleteContact(socialId, userId);

  return success(res, "sucessfull");
};
