import { connectionSource } from '../database/data-source';
import { error, success } from "../utils";
import { Images, Project, ProjectsImage } from "../database/entity/model"
import { cloudinaryService } from "./image-upload.service";

export const getProjectsService = async (id: number,
    // data: Partial<Project>,
    ) => {
    const projectRepository = connectionSource.getRepository(Project)

    const savedProjectDetails = await projectRepository.find({where: {id: id}})
    return savedProjectDetails
}