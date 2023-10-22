import { NextFunction, Request, Response } from "express";
import { connectionSource as dataSource } from "../database/data-source";
import { success, error } from "../utils";
import { Certificate, Section } from "../database/entities";
import { User } from "../database/entities";
import { validateCertificateData } from "../middlewares/certificate.zod";
import { BadRequestError, NotFoundError, errorHandler } from "../middlewares";

const certificateRepo = dataSource.getRepository(Certificate);
const userRepository = dataSource.getRepository(User);
const sectionRepository = dataSource.getRepository(Section);

const addCertificateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, year, organization, url, description, sectionId } = req.body;
    const userId = req.params.userId;

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      const err = new NotFoundError(
        "User not found. Please provide a valid User ID"
      );
      return errorHandler(err, req, res, next);
    }

    const section = await sectionRepository.findOneBy({ id: sectionId });
    if (!section) {
      const err = new NotFoundError(
        "Section not found. Please provide a valid section ID"
      );
      return errorHandler(err, req, res, next);
    }

    const certificateDataIsValid = await validateCertificateData(req, res);

    if (certificateDataIsValid) {
      const certificate = new Certificate();

      certificate.title = title;
      certificate.year = year;
      certificate.organization = organization;
      certificate.url = url;
      certificate.description = description;
      certificate.section = section;
      certificate.user = user;

      // Save the certificate to the database
      const savedCertificate = await certificateRepo.save(certificate);

      // Remove the user property from the saved certificate
      Reflect.deleteProperty(savedCertificate, "user");

      if (!savedCertificate) {
        const err = new BadRequestError("Error creating certificate");
        return errorHandler(err, req, res, next);
      }

      return success(res, savedCertificate, "Certificate created successfully");
    }
  } catch (err) {
    return errorHandler(err, req, res, next);
  }
};

const getAllCertificates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const certificateRepository = dataSource.getRepository(Certificate);
  const userId = req.params.userId;

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    const err = new NotFoundError(
      "User not found. Please provide a valid User ID"
    );
    return errorHandler(err, req, res, next);
  }

  try {
    const certificates = await certificateRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ["section"],
    });

    if (!certificates) {
      const err = new BadRequestError("Error fetching certificates");
      return errorHandler(err, req, res, next);
    }

    return success(res, certificates, "Certificates fetched successfully");
  } catch (err) {
    return errorHandler(err, req, res, next);
  }
};

const getCertificateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.certId);
  const userId = req.params.userId;

  if (!id) {
    const err = new NotFoundError("Please provide a valid certificate ID");
    return errorHandler(err, req, res, next);
  }

  const certificateRepository = dataSource.getRepository(Certificate);

  try {
    const certificate = await certificateRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
      relations: {
        section: true,
      },
    });

    if (!certificate) {
      const err = new NotFoundError("Certificate not found");
      return errorHandler(err, req, res, next);
    }

    return success(res, certificate, "Certificate fetched successfully");
  } catch (err) {
    return errorHandler(err, req, res, next);
  }
};

const isUUID = (value: string) => {
  // Regular expression to match UUID format (8-4-4-12)
  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidPattern.test(value);
};

const deleteCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { certId, userId } = req.params;

  // Validate userId is a UUID
  if (!isUUID(userId)) {
    const err = new BadRequestError("Provide a valid userid in UUID format");
    return errorHandler(err, req, res, next);
  }

  // Validate certId is an integer
  if (!Number.isInteger(Number(certId))) {
    const err = new BadRequestError(
      "Provide a valid certId. It must be an integer"
    );
    return errorHandler(err, req, res, next);
  }

  const certificateRepository = dataSource.getRepository(Certificate);

  try {
    // Check if the user with userId exists
    const user = await userRepository
      .createQueryBuilder()
      .where("id = :id", { id: userId })
      .getOne();

    if (!user) {
      const err = new NotFoundError(
        "User not found. Please provide a valid User ID"
      );
      return errorHandler(err, req, res, next);
    }

    const certificate = await certificateRepository
      .createQueryBuilder()
      .where("id = :id", { id: certId })
      .getOne();

    if (certificate) {
      await certificateRepository.remove(certificate);

      // Fetch the updated list of certificates
      const updatedCertificates = await certificateRepository.find();

      return success(res, {
        message: "Certificate deleted successfully",
        certificates: updatedCertificates,
      });
    } else {
      const err = new NotFoundError("Certificate not found");
      return errorHandler(err, req, res, next);
    }
  } catch (err) {
    errorHandler(err, req, res, next);
    // (error);
  }
};

const updateCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.certId);
    const user_id = req.params.userId;
    const sectionId = parseInt(req.body.sectionId);
    const payload = req.body;

    // Validate the certificate data
    const certificateDataIsValid = await validateCertificateData(
      req,
      res,
      true
    );

    if (!certificateDataIsValid) {
      return;
    }

    const user = await userRepository.findOneBy({ id: user_id });
    if (!user) {
      const err = new NotFoundError(
        "User not found. Please provide a valid User ID"
      );
      return errorHandler(err, req, res, next);
    }

    const certificate = await certificateRepo.findOne({
      where: {
        id: id,
        user: { id: user_id },
      },
    });

    if (!certificate) {
      const err = new NotFoundError("Certificate not found");
      return errorHandler(err, req, res, next);
    }

    const section = await sectionRepository.findOneBy({ id: sectionId });

    if (!section) {
      return new NotFoundError("Section not found");
    }

    // Update certificate properties
    certificate.title = payload.title;
    certificate.year = payload.year;
    certificate.organization = payload.organization;
    certificate.url = payload.url;
    certificate.description = payload.description;
    certificate.section = section;
    certificate.user = user;

    const updatedCertificate = await certificateRepo.save(certificate);

    if (!updatedCertificate) {
      const err = new BadRequestError("Error updating certificate");
      return errorHandler(err, req, res, next);
    }

    // Remove the user property from the updated certificate
    Reflect.deleteProperty(updatedCertificate, "user");

    return success(res, updatedCertificate, "Certificate updated successfully");
  } catch (err) {
    return errorHandler(err, req, res, next);
  }
};

export {
  addCertificateController,
  deleteCertificate,
  getCertificateById,
  getAllCertificates,
  updateCertificate,
};
