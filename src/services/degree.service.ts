import { title } from "process";
import { connectionSource } from "../database/data-source";
import { Degree } from "../database/entity/model";
import { NotFoundError } from "../middlewares/index";

export const getDegree = async (id: number) => {
  // check if the degree exist in the database

  const degreeRepository = connectionSource.getRepository(Degree);

  const degree = await degreeRepository.findOneBy({ id: id });

  if (!degree) {
    throw new NotFoundError("degree not found");
  }

  return {
    message: "Degree fetched successfully",
    data: {
      title: title,
    },
  };
};
