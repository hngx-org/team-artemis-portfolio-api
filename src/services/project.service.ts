import { connectionSource } from "../database/data-source";
import { error, success } from "../utils";
import { Images, Project, ProjectsImage } from "../database/entity/model";
import { cloudinaryService } from "./image-upload.service";
import { NotFoundError, CustomError } from "../middlewares";


export const updateProjectService = async (
    id: number,
    data: Partial<Project>,
    images: any[]
) => {
    const projectRepository = connectionSource.getRepository(Project);
    const projectsImageRepository = connectionSource.getRepository(ProjectsImage);
    const imagesRepository = connectionSource.getRepository(Images);
    const projectToUpdate = await projectRepository.findOneBy({ id: id });

    if (!projectToUpdate) {

        throw new NotFoundError("Project not found!!");
    }
    if(JSON.stringify(data) === '{}'){
        throw new CustomError("No data to update", 400);
    }

    await projectRepository.update(id, data);
    const updatedProject = await projectRepository.findOneBy({ id: id });

    // handle image upload
    if (images && images.length > 0) {
        const { successful, message, urls } = await cloudinaryService(images, "image");
        if (successful) {
            for (let i = 0; i < urls.length; i++) {
                const image = new Images();
                image.url = urls[i];
                await imagesRepository.save(image);
                const projectImage = new ProjectsImage();
                projectImage.projectId = id;
                projectImage.imageId = image.id;
                await projectsImageRepository.save(projectImage);
            }
        } else {
            throw new CustomError(message, 400);
        }
    }

    return updatedProject;
}

