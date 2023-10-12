import { CertificateData } from "../interfaces/certificate.interface";
import { connectionSource } from "../database/data-source";
import { Certificate } from "../database/entity/model";
import { Section } from "../database/entity/model";
import { User } from "../database/entity/user";
import { FindOneOptions } from "typeorm";
import { NotFoundError, BadRequestError } from "../middlewares/index";

export const saveCertificate = async (
  certificatePayload: CertificateData
): Promise<CertificateData> => {
  try {
    const { user, section } = certificatePayload;

    // Get the repositories
    const certificationDetailRepository =
      connectionSource.getRepository(Certificate);
    const userRepository = connectionSource.getRepository(User);
    const sectionRepository = connectionSource.getRepository(Section);

    // Check if the user exists
    const userQuery: FindOneOptions<User> = { where: { id: user.id } };
    const getUser = await userRepository.findOne(userQuery);
    if (!getUser) {
      throw new NotFoundError("User not found");
    }

    // Check if the section exists
    const sectionQuery: FindOneOptions<Section> = { where: { id: section.id } };
    const Getsection = await sectionRepository.findOne(sectionQuery);
    if (!Getsection) {
      throw new NotFoundError("Section not found");
    }

    // Create a new certification detail entity
    const certificationDetail = certificationDetailRepository.create({
      title: certificatePayload.title,
      year: certificatePayload.year,
      organization: certificatePayload.organization,
      url: certificatePayload.url,
      description: certificatePayload.description,
      user: getUser, // Assign the found user
      section: Getsection, // Assign the found section
    });

    // Save the certification detail to the database
    const createdCertificationDetail = await certificationDetailRepository.save(
      certificationDetail
    );

    return createdCertificationDetail;
  } catch (error) {
    // Handle errors, log them, and return appropriate responses
    console.error(error);
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error; // Re-throw custom errors
    } else {
      throw new BadRequestError("Error while processing the request");
    }
  }
};
