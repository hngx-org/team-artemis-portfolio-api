import { v4 as uuidv4, validate as isUUID } from "uuid";
import { connectionSource } from "../database/data-source";
import { Degree, EducationDetail, Section } from "../database/entities";
import { EducationDetailData } from "../interfaces";
import { User } from "../database/entities";

import {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  errorHandler,
} from "../middlewares";

const createEducationDetail = async (data: EducationDetailData) => {
  try {
    const { user_id, degree_id, section_id } = data;
    console.log("data is here", data);

    // Get the education detail repository
    const educationDetailRepository =
      connectionSource.getRepository(EducationDetail);

    // Check if the user exists
    const userRepository = connectionSource.getRepository(User);
    const sectionRepository = connectionSource.getRepository(Section);
    const degreeRepository = connectionSource.getRepository(Degree);
    // const user = await userRepository.findOne({ where: { id: user_id } });
    let user: User;

    if (isUUID(user_id)) {
      user = await userRepository.findOne({ where: { id: user_id } });
    } else {
      user = await userRepository.findOne({ where: { slug: user_id } });
    }

    const section = await sectionRepository.findOne({
      where: { id: section_id },
    });
    const degree = await degreeRepository.findOne({ where: { id: degree_id } });

    if (!user) {
      return "User not found";
    }
    if (!section) {
      throw new Error("Section not found");
    }
    if (!degree) {
      throw new Error("Degree not found");
    }

    // Create a new education detail instance
    const educationDetail = new EducationDetail();

    educationDetail.user = user;
    educationDetail.section = section;
    educationDetail.degree = degree;
    educationDetail.to = data.to;
    educationDetail.from = data.from;
    educationDetail.description = data.description;
    educationDetail.school = data.school;
    educationDetail.fieldOfStudy = data.fieldOfStudy;

    console.log("educationDetail", educationDetail);
    // Save the education detail to the database
    const createdEducationDetail = await educationDetailRepository.save(
      educationDetail
    );

    const mappedData = {
      user_id: createdEducationDetail.user.id,
      section_id: createdEducationDetail.section.id,
      degree_id: createdEducationDetail.degree.id,
      to: createdEducationDetail.to,
      from: createdEducationDetail.from,
      description: createdEducationDetail.description,
      school: createdEducationDetail.school,
      fieldOfStudy: createdEducationDetail.fieldOfStudy,
      id: createdEducationDetail.id,
    };

    return mappedData;
  } catch (error) {
    console.error("Error creating education detail:", error.message);
    // throw new Error("Error creating education detail");
  }
};

const updateEducationDetailID = async (
  educationDetailId: number,
  data: EducationDetailData,
  next: any
) => {
  try {
    // Get the education detail repository
    const educationDetailRepository =
      connectionSource.getRepository(EducationDetail);

    // Check if the education detail exists
    const existingEducationDetail = await educationDetailRepository.findOne({
      where: { id: educationDetailId },
    });

    if (!existingEducationDetail) {
      throw new NotFoundError("Education detail was not found");
    }

    // Update the education detail with new data
    existingEducationDetail.to = data.to;
    existingEducationDetail.from = data.from;
    existingEducationDetail.description = data.description;
    existingEducationDetail.school = data.school;
    existingEducationDetail.fieldOfStudy = data.fieldOfStudy;

    console.log("i am here");
    console.log(existingEducationDetail);

    // Get the degree object from the database
    const degreeRepository = connectionSource.getRepository(Degree);
    const degree = await degreeRepository.findOne({
      where: { id: data.degree_id },
      relations: ["educationDetails"],
    });

    if (!degree) {
      throw new NotFoundError("Selected Degree  was not found");
    }

    existingEducationDetail.degree = degree;

    console.log("i am here");

    // Save the updated education detail to the database
    const updatedEducationDetail = await educationDetailRepository.update(
      educationDetailId,
      existingEducationDetail
    );

    const mappedData = {
      degree_id: existingEducationDetail.degree.id,
      to: existingEducationDetail.to,
      from: existingEducationDetail.from,
      description: existingEducationDetail.description,
      school: existingEducationDetail.school,
      fieldOfStudy: existingEducationDetail.fieldOfStudy,
      id: existingEducationDetail.id,
    };

    //  fetch the updated education detail
    const educationDetail = await educationDetailRepository.findOne({
      where: { id: educationDetailId },
    });

    return educationDetail;
  } catch (error) {
    console.error("Error updating education detail:", error.message);
    return next(error);
  }
};

export { createEducationDetail, updateEducationDetailID };
