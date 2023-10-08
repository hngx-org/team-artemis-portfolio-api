import { updateContact, deleteContact, findUser } from "../services";
import { error, success } from "../utils/response.util";
import { ContactBody } from "../interfaces";
import { Request, Response, RequestHandler } from "express";

export const updateContactController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { socialMediaId, url }: ContactBody = req.body;

    const userId: string = req.user.id;
    const socialId: number = Number(req.params.Id);

    const user = await findUser(userId);

    if (!user) {
      return error({
        message: "User not found: The requested user does not exist.",
        statusCode: 404, // Use 404 for "Resource not found" errors
      });
    }

    const contact = await updateContact(socialMediaId, url, socialId, userId);

    if (contact === null) {
      return error({
        message:
          "Contact not updated: The requested contact could not be updated.",
        statusCode: 500, // Use 500 for internal server errors
      });
    }

    return success("Contact updated successfully", contact);
  } catch (error) {
    error(res, (error as Error).message);
  }
};

export const deleteContactController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const socialId: number = Number(req.params.Id);
  const userId: string = req.user.Id;
  const user = await findUser(userId);

  if (!user) {
    return error({
      message: "User not found: The requested user does not exist.",
      statusCode: 404, // Use 404 for "Resource not found" errors
    });
  }
  const contact = await deleteContact(socialId, userId);

  return success(res, "sucessfull", 200);
};
