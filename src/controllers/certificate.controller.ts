import { Request, Response } from "express";
import { connectionSource as dataSource } from "../database/data-source";
import { success, error } from "../utils";
import { Certificate, Section } from "../database/entities";
import { User } from "../database/entities";
import { validateCertificateData } from "../middlewares/certificate.zod";
import { NotFoundError } from "../middlewares";

const certificateRepo = dataSource.getRepository(Certificate);
const userRepository = dataSource.getRepository(User);
const sectionRepository = dataSource.getRepository(Section);

const addCertificateController = async (req: Request, res: Response) => {
  try {
    const { title, year, organization, url, description, sectionId } = req.body;
    const userId = req.params.userId;

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return new NotFoundError(
        "User not found. Please provide a valid User ID"
      );
    }

    const section = await sectionRepository.findOneBy({ id: sectionId });
    if (!section) {
      return new NotFoundError(
        "Section not found. Please provide a valid section ID"
      );
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
        return new BadRequestError("Error creating certificate");
      }

      return success(res, savedCertificate, "Certificate created successfully");
    }
  } catch (err) {
    return error(res, (err as Error)?.message);
  }
};

const getAllCertificates = async (req: Request, res: Response) => {
  const certificateRepository = dataSource.getRepository(Certificate);
  const userId = req.params.userId;

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return new NotFoundError("User not found. Please provide a valid User ID");
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
      return new BadRequestError("Error fetching certificates");
    }

    return success(res, certificates, "Certificates fetched successfully");
  } catch (err) {
    return error(res, (err as Error)?.message ?? "Internal server error");
  }
};

const getCertificateById = async (req: Request, res: Response) => {
  const id = Number(req.params.certId);

  if (!id) {
    return new NotFoundError("Please provide a valid certificate ID");
  }

  const certificateRepository = dataSource.getRepository(Certificate);

  try {
    const certificate = await certificateRepository.findOne({
      where: {
        id,
      },
      relations: {
        section: true,
      },
    });

    if (!certificate) {
      return new NotFoundError("Certificate not found");
    }

    return success(res, certificate, "Certificate fetched successfully");
  } catch (err) {
    return error(res, (err as Error)?.message ?? "Internal server error");
  }
};

const deleteCertificate = async (req: Request, res: Response) => {
  const id = req.params.certId;
  const certificateRepository = dataSource.getRepository(Certificate);

  try {
    const certificate = await certificateRepository
      .createQueryBuilder()
      .where("id = :id", { id })
      .getOne();

    if (certificate) {
      await certificateRepository.remove(certificate);

      // Fetch the updated list of certificates
      const updatedCertificates = await certificateRepository.find();

      res.json({
        message: "Certificate deleted successfully",
        certificates: updatedCertificates,
      });
    } else {
      res.status(404).json({ error: "Certificate not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCertificate = async (req: Request, res: Response) => {
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
      return new NotFoundError(
        "User not found. Please provide a valid User ID"
      );
    }

    const certificate = await certificateRepo.findOne({
      where: {
        id: id,
        user: { id: user_id },
      },
    });

    if (!certificate) {
      return new NotFoundError("Certificate not found");
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
      return new BadRequestError("Error updating certificate");
    }

    // Remove the user property from the updated certificate
    Reflect.deleteProperty(updatedCertificate, "user");

    return success(res, updatedCertificate, "Certificate updated successfully");
  } catch (err) {
    return error(res, err.message || "Internal server error");
  }
};

export {
  addCertificateController,
  deleteCertificate,
  getCertificateById,
  getAllCertificates,
  updateCertificate,
};
