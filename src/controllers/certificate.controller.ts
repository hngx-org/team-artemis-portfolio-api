import { Request, Response } from "express";
import { connectionSource as dataSource } from "../database/data-source";
import { success, error } from "../utils";
import { updateACertificate } from "../services/certificate.service";
import { UpdateCertificateInterface } from "../interfaces/certification.interface";
import { Certificate, Section } from "../database/entities";
import { User } from "../database/entities";
import { validateCertificateData } from "../middlewares/certificate.zod";

const certificateRepo = dataSource.getRepository(Certificate);
const userRepository = dataSource.getRepository(User);
const sectionRepository = dataSource.getRepository(Section);

const addCertificateController = async (req: Request, res: Response) => {
  try {
    const { title, year, organization, url, description, sectionId } = req.body;
    const userId = req.params.userId;

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return error(res, "User not found. Please provide a valid User ID", 404);
    }

    const section = await sectionRepository.findOneBy({ id: sectionId });
    if (!section) {
      return error(
        res,
        "Section not found. Please provide a valid section ID",
        404
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
      certificate.user = user;
      certificate.section = section;

      // Save the certificate to the database
      const savedCertificate = await certificateRepo.save(certificate);

      // Remove the user property from the saved certificate
      Reflect.deleteProperty(savedCertificate, "user");

      if (!savedCertificate) {
        return error(res, "Error creating certificate", 400);
      }

      return success(res, savedCertificate, "Certificate created successfully");
    }
  } catch (err) {
    console.error("Error creating certificate:", err);
    return error(res, (err as Error)?.message);
  }
};

const getAllCertificates = async (req: Request, res: Response) => {
  const certificateRepository = dataSource.getRepository(Certificate);
  const userId = req.params.userId;

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return error(res, "User not found. Please provide a valid User ID", 404);
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
      return error(res, "Error fetching certificates", 400);
    }

    return success(res, certificates, "Certificates fetched successfully");
  } catch (error) {
    return error(res, (error as Error)?.message ?? "Internal server error");
  }
};

const getCertificateById = async (req: Request, res: Response) => {
  const id = Number(req.params.certId);

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
      return error(res, "Certificate not found", 404);
    }

    return success(res, certificate, "Certificate fetched successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ error: (error as Error)?.message ?? "Internal server error" });
  }
};

const deleteCertificate = async (req: Request, res: Response) => {
  const id = req.params.certId;
  const certificateRepository = dataSource.getRepository(Certificate);

  console.log("Request received to delete certificate with certId:", id);

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

const uuidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const isValidCertificate = (
  payload: any
): payload is UpdateCertificateInterface => {
  return (
    typeof payload.title === "string" &&
    typeof payload.year === "string" &&
    typeof payload.organization === "string" &&
    typeof payload.url === "string" &&
    typeof payload.description === "string"
  );
};

const updateCertificate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = req.params.userId;
    const section_id = parseInt(req.params.section_id);
    const payload = req.body;

    if (
      !id ||
      typeof id !== "number" ||
      !user_id ||
      !uuidPattern.test(user_id)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide an integer id and a valid UUID user id as parameters",
      });
    }

    if (!isValidCertificate(payload)) {
      return res.status(400).json({
        success: false,
        message: "Payload should be in the format below",
        format: {
          title: "string",
          year: "string",
          organization: "string",
          url: "string",
          description: "string",
        },
      });
    }

    const data = await updateACertificate(id, user_id, section_id, payload);
    if (data.successful) {
      success(res, data.data[0], "Certificate updated successfully");
    } else {
      error(res, data.message);
    }
  } catch (error: any) {
    return error(res, error.message);
  }
};

export {
  addCertificateController,
  deleteCertificate,
  getCertificateById,
  getAllCertificates,
  updateCertificate,
};
