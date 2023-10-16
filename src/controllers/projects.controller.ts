import {
  Project,
  Images,
  ProjectsImage,
  User,
  Section,
} from "../database/entities";
import { connectionSource } from "../database/data-source";
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { error, success } from "../utils";
import { cloudinaryService } from "../services/image-upload.service";
import { updateProjectService } from "../services/project.service";
import { projectSchema } from "../middlewares/projects.zod";

import { CustomError, NotFoundError, BadRequestError } from "../middlewares";

const projectRepository = connectionSource.getRepository(Project);
const imageRepository = connectionSource.getRepository(Images);
const projectImageRepository = connectionSource.getRepository(ProjectsImage);
const userRepository = connectionSource.getRepository(User);
const sectionRepositoty = connectionSource.getRepository(Section);

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
    const project = await projectRepository.findOne({
      where: {
        id: +id,
      },
      relations: ["projectsImages"],
    });
    const allThumbnails = await projectImageRepository.find({
      where: { project },
    });

    const thumbnail = await imageRepository.findOne({
      where: { id: allThumbnails[0].id },
    });

    project.thumbnail = thumbnail.url as any;
    const imageUrlsPromises = project.projectsImages.map(async (image) => {
      const imageEntity = await imageRepository.findOne({
        where: { id: image.id },
      });
      return imageEntity ? imageEntity.url : null;
    });
    project.projectsImages = (await Promise.all(imageUrlsPromises)) as any;
    success(res, project, "Successfully Retrieved");
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
      return res
        .status(400)
        .json({
          error: "Please check the input data",
          message: "Invalid JSON",
        });
    }

    const normalizedData: ProjectModel = {} as ProjectModel;
    for (const key in jsonData) {
      if (Object.hasOwnProperty.call(jsonData, key)) {
        const normalizedKey = key.toLowerCase();
        if (normalizedKey === "userid") {
          normalizedData["userId"] = jsonData[key];
        } else if (normalizedKey === "sectionid") {
          normalizedData["sectionId"] = +jsonData[key];
        } else {
          normalizedData[normalizedKey] = jsonData[key];
        }
      }
    }

    try {
      projectSchema.parse(normalizedData);
    } catch (error) {
      const errors = [];
      if (error.name == "ZodError") {
        const msg = error.issues.map((issue: any) => {
          errors.push(`${issue.path[0]}: ${issue.message}`);
        });
      }

      const response = errors.join(", ");
      throw new BadRequestError(response);
    }
    const { title, year, url, tags, description, userId, sectionId } =
      normalizedData;

    if (!userId || !sectionId) {
      throw new BadRequestError("Please provide user and section");
    }
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const section = await sectionRepositoty.findOneBy({ id: sectionId });
    {
      if (!section) {
        throw new NotFoundError("Section not found");
      }
    }

    const project = new Project();
    project.title = title;
    project.year = year;
    project.url = url;
    project.tags = tags;
    project.description = description;
    project.user = user;
    project.section = section;
    project.thumbnail = 0;

    const newProject = await projectRepository.save(project);
    if (!newProject.id) {
      throw new CustomError("Project not created", 400);
    }
    const files = req.files as any;
    if (!files.length) {
      throw new BadRequestError("Add thumbnail image");
    }

    if (files.length > 10) {
      throw new BadRequestError("You can only upload a maximum of 10 images");
    }

    const imagesRes = await cloudinaryService(files, req.body.service);

    for (const url of imagesRes.urls) {
      const image = new Images() as Images;
      image.url = url;

      try {
        const imageResponse = await imageRepository.save(image);

        const projectImage = new ProjectsImage();

        const savedImage = await imageRepository.findOne({
          where: { id: imageResponse.id },
        });

        projectImage.project = newProject;
        projectImage.image = savedImage;

        const out = await projectImageRepository.save(projectImage);
      } catch (err) {
        throw new CustomError(err.message, 400);
      }
    }

    const allThumbnails = await projectImageRepository.find({
      where: { project: { id: project.id } },
    });
    const updatedProject = await projectRepository.find({
      where: { id: newProject.id },
    });
    if (allThumbnails.length === 0) {
      return success(res, updatedProject, "Created without thumbnail");
    }

    const thumbnail = await imageRepository.findOne({
      where: { id: allThumbnails[0].id },
    });

    let data;
    if (thumbnail) {
      const thumbnailId = thumbnail.id;
      data = await projectRepository.update(
        { id: newProject.id },
        { thumbnail: thumbnailId }
      );

      const updatedProject = await projectRepository.findOne({
        where: {
          id: +newProject.id,
        },
        relations: ["projectsImages"],
      });
      updatedProject.thumbnail = thumbnail.url as any;
      const imageUrlsPromises = updatedProject.projectsImages.map(
        async (image) => {
          const imageEntity = await imageRepository.findOne({
            where: { id: image.id },
          });
          return imageEntity ? imageEntity.url : null;
        }
      );
      updatedProject.projectsImages = (await Promise.all(
        imageUrlsPromises
      )) as any;
      success(res, updatedProject, "Successfully created");
    } else {
      success(
        res,
        { thumbnail: thumbnail.url, ...data },
        "Created without thumbnail"
      );
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
    throw new BadRequestError("Please provide data to update!!");
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
  } catch (error) {
    return error(res, "Project update failed");
  }
};
export const deleteProjectController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const projectDetail = await projectRepository.findOne({
      where: { id: id },
    });

    if (!projectDetail) {
      const errorResponse = {
        message: "Project not Found!",
      };
      res.status(404).json(errorResponse);
    } else {
      const deletedProject = await projectRepository.delete({ id });

      res.status(200).json({
        message: "Project deleted successfully",
        deletedProject: projectDetail,
      });
    }
  } catch (error) {
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
    const errors = [];
    if (error.name == "ZodError") {
      const msg = error.issues.map((issue: any) => {
        errors.push(`${issue.path[0]}: ${issue.message}`);
      });
    }

    const response = errors.join(", ");
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
