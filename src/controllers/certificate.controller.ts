import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { Certificate } from "../database/entity/model";
import { CertificateData } from "../interfaces/certificate.interface";
import { User } from "../database/entity/user";
import { saveCertificate } from "../services/certificate.service";

export const createCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //collect the payload from req.body
    // pass the payload to the service and create certificate
    // return created certificate

    const certificatePayload: CertificateData = req.body;

    const createdCertificate = await saveCertificate(certificatePayload);

    res.status(201).json(createdCertificate);
  } catch (error) {
    next(error);
  }
};
