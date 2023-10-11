import { Project, Images, ProjectsImage } from "../database/entity/model";
import { connectionSource } from "../database/data-source";
import express, { Request, RequestHandler, Response } from "express";
import { error, success } from "../utils";
import { cloudinaryService } from "../services/image-upload.service";
import { updateProjectService } from "../services/project.service";
import {z} from 'zod'

const projectRepository = connectionSource.getRepository(Project);
const imageRepository = connectionSource.getRepository(Images);
const projectImageRepository = connectionSource.getRepository(ProjectsImage);

interface ProjectModel {
  title: string;
  year: string;
  url: string;
  tags: string;
  description: string;
  userId: string;
  sectionId: number;
  thumbnail: number;
}

export const getAllProjects: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await projectRepository.find();
    success(res, data);
  } catch (err) {
    error(res, (err as Error).message);
  }
};

export const getProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = await projectRepository.findOneBy({ id: +id });
    success(res, data);
  } catch (err) {
    error(res, (err as Error).message);
  }
};

export const createProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body.jsondata);
    const { title, year, url, tags, description, userId, sectionId } =
      JSON.parse(req.body.jsondata);

    if (
      !title ||
      !year ||
      !url ||
      !tags ||
      !description ||
      !userId ||
      !sectionId
    )
      return error(res, "All fields are required", 400);

    const project = new Project() as ProjectModel;
    project.title = title;
    project.year = year;
    project.url = url;
    project.tags = tags;
    project.description = description;
    project.userId = userId;
    project.sectionId = sectionId;
    project.thumbnail = 0;

    const data = await projectRepository.save(project);
    const projectId = data.id;

    const files = req.files as any;
    if (!files) {
      return error(res, "Add thumbnail image", 400);
    }

    const imagesRes = await cloudinaryService(files, req.body.service);

    const imagePromises = imagesRes.urls.map(async (url) => {
      const image = new Images() as Images;
      image.url = url;
      const imageResponse = await imageRepository.save(image);

      const projectImage = new ProjectsImage() as ProjectsImage;
      projectImage.projectId = projectId;
      projectImage.imageId = imageResponse.id;
      await projectImageRepository.save(projectImage);
    });

    await Promise.all(imagePromises);

    const allThumbnails = await projectImageRepository.findBy({
      projectId: projectId,
    });

    if (allThumbnails.length === 0) {
      return success(res, data, "Created without thumbnail");
    }

    const thumbnail = await imageRepository.findOneBy({
      id: allThumbnails[0].imageId,
    });

    if (thumbnail) {
      const thumbnailId = thumbnail.id;
      const projectUpdate = await projectRepository.findOneBy({
        id: projectId,
      });
      const data = await projectRepository.update(
        { id: +projectId },
        { thumbnail: +thumbnailId }
      );
      const updatedProject = await projectRepository.findOneBy({
        id: +projectId,
      });
      success(res, updatedProject, "Successfully created");
    } else {
      success(res, data, "Created without thumbnail");
    }
  } catch (err) {
    error(res, (err as Error).message);
  }
};

// update project section
export const updateProjectController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.project_id;
  const data = req.body;
  const images = req.files as Express.Multer.File[];

  if (!images) {
    return error(res, "You need to upload an image");
  }

  if (images.length > 10) {
    return error(res, "You can only upload a maximum of 10 images at a time");
  }

  try {
    console.log(id);
    const updatedProject = await updateProjectService(
      parseInt(id),
      data,
      images
    );
    return success(
      res,
      updatedProject,
      `Project with id: ${id} updated successfully`
    );
  } catch (error) {
    console.log(error);
    return error(res, "Project update failed");
  }
};
export const deleteProjectById: RequestHandler = async (req, res) => {
  
  try {
    const { id } = req.params;
    
    const idParamSchema = z.string();
    const validId = idParamSchema.safeParse(id);

    if (validId.success) {
      const deletionResult = await performProjectDeletion(validId.data);

      if (deletionResult.affected) {
        return success(res, deletionResult, 'Project Deleted Successfully');
      } else {
        throw new Error('Project not found');
      }
    } else {
      throw new Error('Invalid project id');
    }
  } catch (err) {
    error(res, err.message);
  }
};

async function performProjectDeletion(id) {
  console.log('Deleting project with ID:', id);
  try {
    const deletionResult = await projectRepository.delete({id});
    console.log('Deletion result:', deletionResult);
    if(deletionResult.affected > 0){
      return { affected: deletionResult.affected, message: 'Project Deleted Successfully' };
    }else{
      return { affected: 0 , message: 'Project not found' };
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    return { affected: 0, message: 'Error deleting project' };
  }
  
}

// update project section
export const updateProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.project_id;
  const data = req.body;
  const images = req.files as Express.Multer.File[];

  if (!images) {
    return error(res, "You need to upload an image");
  }

  if (images.length > 10) {
    return error(res, "You can only upload a maximum of 10 images at a time");
  }

  try {
    console.log(id);
    const updatedProject = await updateProjectService(
      parseInt(id),
      data,
      images
    );
    return success(
      res,
      updatedProject,
      `Project with id: ${id} updated successfully`
    );
  } catch (error) {
    console.log(error);
    return error(res, "Project update failed");
  }
};
