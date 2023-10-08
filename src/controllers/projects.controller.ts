import { Project, Images, ProjectsImage } from "../database/entity/model";
import { connectionSource } from "../database/data-source";
import express, { Request, RequestHandler, Response } from "express";
import { error, success } from "../utils";
import { cloudinaryService } from "../services/image-upload.service";

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

export const updateProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, year, url, tags, description, userId, sectionId } = req.body;
    const updatedProject = await projectRepository.findOneBy({ id: +id });

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    if (title) {
      updatedProject.title = title as string;
    }

    if (year) {
      updatedProject.year = year as string;
    }

    if (url) {
      updatedProject.url = url as string;
    }

    if (tags) {
      updatedProject.tags = tags as string;
    }

    if (description) {
      updatedProject.description = description as string;
    }

    if (userId) {
      updatedProject.userId = userId as string;
    }

    if (sectionId) {
      updatedProject.sectionId = sectionId as number;
    }

    const data = await projectRepository.save(updatedProject);
    success(res, data, "Project Updated Successfully");
  } catch (err) {
    error(res, (err as Error).message);
  }
};
export const deleteProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("No project id provided");
    }
    const data = await projectRepository.delete({ id: +id });
    if (!data.affected) {
      throw new Error("Project not found");
    }
    success(res, data, "Project Deleted Successfully");
  } catch (err) {
    error(res, (err as Error).message);
  }
};
