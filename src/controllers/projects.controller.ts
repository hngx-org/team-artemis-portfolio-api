import { Project, Images, ProjectsImage } from "../database/entity/model";
import { connectionSource } from "../database/data-source";
import express, { NextFunction, Request, RequestHandler, Response } from "express";
import { error, success } from "../utils";
import { cloudinaryService } from "../services/image-upload.service";
import { updateProjectService } from "../services/project.service";
import { projectSchema } from "../middlewares/projects.zod";


import {
  CustomError,
  NotFoundError,
  BadRequestError
} from '../middlewares'

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
  req: Request,
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
  res: Response,
  next: NextFunction
) => {
  try {
    let jsonData;
    try {
      jsonData = JSON.parse(req.body.jsondata);
    } catch (error) {
      return res.status(400).json({ error: "Please check the input data", message: "Invalid JSON" });
    }

    const normalizedData: ProjectModel = {} as ProjectModel;
    for (const key in jsonData) {
      if (Object.hasOwnProperty.call(jsonData, key)) {
        const normalizedKey = key.toLowerCase();
        if (key === 'userid') {
          normalizedData["userId"] = jsonData[key];
          continue;
        }
        if (key === 'sectionid') {
          normalizedData["sectionId"] = +jsonData[key];
          continue;
        }
        normalizedData[normalizedKey] = jsonData[key];
      }
    }

    try {
      projectSchema.parse(normalizedData);

    } catch (error) {
      const errors = []
      if (error.name == 'ZodError') {
        const msg = error.issues.map((issue: any) => {
          errors.push(`${issue.path[0]}: ${issue.message}`)
        })
      }

      const response = errors.join(', ');
      throw new BadRequestError(response);
    }
    const { title, year, url, tags, description, userId, sectionId } = normalizedData;



    const project = new Project() as unknown as ProjectModel;
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
    if (!files.length) {
      throw new BadRequestError('Add thumbnail image');
    }
    console.log(files.length)
    if (files.length > 10) {
      throw new BadRequestError('You can only upload a maximum of 10 images');
    }

    const imagesRes = await cloudinaryService(files, req.body.service);

    for (const url of imagesRes.urls) {
      const image = new Images() as Images;
      image.url = url;

      try {
        const imageResponse = await imageRepository.save(image);

        const projectImage = new ProjectsImage() as ProjectsImage;
        projectImage.projectId = projectId;
        projectImage.imageId = imageResponse.id;

        await projectImageRepository.save(projectImage);
      } catch (error) {
        throw new CustomError('Error saving image', 400);
      }
    }

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
      const data = await projectRepository.update(
        { id: projectId },
        { thumbnail: thumbnailId }
      );
      const updatedProject = await projectRepository.findOneBy({
        id: +projectId,
      });
      success(res, updatedProject, "Successfully created");
    } else {
      success(res, data, "Created without thumbnail");
    }
  } catch (err) {
    return next(err);
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


  if (images.length > 10) {
    return error(res, "You can only upload a maximum of 10 images at a time");
  }
  if (!data) {
    throw new BadRequestError('Please provide data to update!!');
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
export const deleteProjectController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const projectDetail = await projectRepository.findOne({ where: { id: id } });

    if (!projectDetail) {
      const errorResponse = {
        message: 'Project not Found!',
      };
      res.status(404).json(errorResponse);
    } else {
      const deletedProject = await projectRepository.delete({ id });

      res.status(200).json({
        message: 'Project deleted successfully',
        deletedProject: projectDetail,
      });
      console.log('Project deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting project detail', error);
    next(error);
  }
};


// update project section
export const updateProjectById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.project_id;
  const data = req.body;
  const images = req.files as Express.Multer.File[];

  try {
    projectSchema.parse(data);

  } catch (error) {
    const errors = []
    if (error.name == 'ZodError') {
      const msg = error.issues.map((issue: any) => {
        errors.push(`${issue.path[0]}: ${issue.message}`)
      })
    }

    const response = errors.join(', ');
    throw new BadRequestError(response);
  }

  try {

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
  } catch (err) {
    return next(err);
  }
};
