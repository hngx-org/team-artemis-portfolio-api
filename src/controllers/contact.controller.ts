import { updateContact, deleteContact, findUser } from "../services";
import { error, success } from "../utils/response.util";
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
      return error(
        res,
        "User not found: The requested user does not exist.",
        404
      );
    }

    const contact = await updateContact(socialMediaId, url, socialId, userId);

    if (!contact) {
      return error(
        res,
        "Contact not updated: The requested contact could not be updated.",
        500
      );
    }

    return res.status(200).json({
      message: "new contact updated"
    });
  } catch (error) {
    next(error(res, (error as Error).message));
  }
};

export const deleteContactController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
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

  try {
    const contact = await deleteContact(socialId, userId);

    if (!contact) {
      return error(
        res,
        "Contact not deleted: The requested contact could not be deleted.",
        500
      );
    }

    return res.status(200).json({
      messsage: "contact deleted"
    });
  } catch (error) {
    next(error(res, (error as Error).message));
  }
};
