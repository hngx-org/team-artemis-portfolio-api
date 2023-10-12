import { connectionSource } from "../database/data-source";
import { Degree } from "../database/entity/model";
import { UpdateDegreeResponse } from "../interfaces/degree.interface";
import { NotFoundError } from "../middlewares/index";

export const getDegree = async (id: number): Promise<UpdateDegreeResponse> => {
  try {
    // check if the degree exist in the database

    const degreeRepository = connectionSource.getRepository(Degree);

    const degree = await degreeRepository.findOneBy({ id: id });

    if (!degree) {
      throw new NotFoundError("degree not found");
    }

    const response: UpdateDegreeResponse = {
      message: "Degree gotten successfully",
      data: degree,
    };
    return response;
  } catch (error) {
    throw error;
  }
};
