import { Project } from "../database/entity/model";
import { connectionSource } from "../database/data-source";

export const getProjectService = async (userId: string
    ): Promise<Project[]> => {
      const projectRepository = connectionSource.getRepository(Project);
    
      const savedProjectDetails = await projectRepository.find({where:{userId: userId}});
    
      return savedProjectDetails;
    };
    