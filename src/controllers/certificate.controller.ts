import { Request, Response } from "express";
import { connectionSource as dataSource } from "../database/data-source";
import { success, error } from "../utils";
import { Certificate } from "../database/entity/model";
import { User } from "../database/entity/user";
import { validateUpdateData } from "../middlewares/certificate.zod";

const certificateRepo = dataSource.getRepository(Certificate);

export const addCertificateController = async (req: Request, res: Response) => {
  try {
    // Validate the request body using the validator
    await validateUpdateData(req, res, async () => {
      const { title, year, organization, url, description, sectionId } =
        req.body;

      const userId = req.params.id;

      const userRepository = dataSource.getRepository(User);

      const isExistingUser = await userRepository.findOneBy({
        id: userId,
      });

      if (!isExistingUser) {
        return error(
          res,
          "User not found. Please provide a valid User ID",
          404
        );
      }

      const certificateInfo = {
        title,
        year,
        organization,
        url,
        description,
        userId,
        sectionId,
      };

      const certificate = certificateRepo.create(certificateInfo);
      if (!certificate) {
        return error(res, "Error creating certificate", 400);
      }
      return success(res, certificate, "Certificate created successfully");
    });
  } catch (err) {
    console.error("Error creating contact:", error);
    return error(res, (err as Error)?.message);
  }
};
