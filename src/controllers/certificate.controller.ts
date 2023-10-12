import { Request, Response } from "express";
import { connectionSource as dataSource } from "../database/data-source";
import { success, error } from "../utils";
import { Certificate } from "../database/entity/model";
import { User } from "../database/entity/user";
// import { validateUpdateData } from "../middlewares/certificate.zod"; // received an error when I used this

const certificateRepo = dataSource.getRepository(Certificate);

const addCertificateController = async (req: Request, res: Response) => {
  try {
    const { title, year, organization, url, description, sectionId } = req.body;
    const userId = req.params.userId;

    // Check if the user with userId exists
    const userRepository = dataSource.getRepository(User);
    const isExistingUser = await userRepository.findOneBy({ id: userId });

    if (!isExistingUser) {
      return error(res, "User not found. Please provide a valid User ID", 404);
    }

    // Create the certificate information
    const certificateInfo = {
      title,
      year,
      organization,
      url,
      description,
      userId,
      sectionId,
    };

    // Create the certificate entity
    const certificate = certificateRepo.create(certificateInfo);

    // Save the certificate to the database
    const savedCertificate = await certificateRepo.save(certificate);

    if (!savedCertificate) {
      return error(res, "Error creating certificate", 400);
    }

    // Include the certId in the response
    return success(res, { ...savedCertificate }, "Certificate created successfully");
  } catch (err) {
    console.error("Error creating certificate:", err);
    return error(res, (err as Error)?.message);
  }
};

const getAllCertificates = async (req: Request, res: Response) => {
  const certificateRepository = dataSource.getRepository(Certificate);

  try {
    const certificates = await certificateRepository.find();

    if (certificates.length > 0) {
      res.json(certificates);
    } else {
      res.status(404).json({ error: 'No certificates found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCertificateById = async (req: Request, res: Response) => {
  const  id  = req.params.certId;
  const certificateRepository = dataSource.getRepository(Certificate);

  try {
    const certificate = await certificateRepository
    .createQueryBuilder()
    .where('id = :id', { id })
    .getOne();

    if (certificate) {
      res.json(certificate);
    } else {
      res.status(404).json({ error: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCertificate = async (req: Request, res: Response) => {
  const id = req.params.certId;
  const certificateRepository = dataSource.getRepository(Certificate);

  console.log('Request received to delete certificate with certId:', id);


  try {
    const certificate = await certificateRepository
    .createQueryBuilder()
    .where('id = :id', { id })
    .getOne();

    if (certificate) {
      await certificateRepository.remove(certificate);

      // Fetch the updated list of certificates
      const updatedCertificates = await certificateRepository.find();

      res.json({
        message: 'Certificate deleted successfully',
        certificates: updatedCertificates, 
      });
    } else {
      res.status(404).json({ error: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  addCertificateController,
  deleteCertificate,
  getCertificateById,
  getAllCertificates
}

