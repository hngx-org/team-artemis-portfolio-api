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
    const Projects = await projectRepository.find();
    success(res, Projects);
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
