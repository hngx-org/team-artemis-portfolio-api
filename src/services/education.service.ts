import { connectionSource } from "../database/data-source";
import { Degree, EducationDetail, Section } from "../database/entities";
import { EducationDetailData } from "../interfaces";
import { User } from "../database/entities";

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
    const user = await userRepository.findOne({ where: { id: user_id } });
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

export { createEducationDetail };
