import express, { Request, RequestHandler, Response } from "express";
import { error, success } from "../utils";
import { cloudinaryService } from "../services";
import { updateProjectService } from "../services/project.service";


// update project section
export const updateProjectController: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;
    const data = req.body;
    const images = req.files as Express.Multer.File[];

    if (images.length > 10){
        return error(res, "You can only upload a maximum of 10 images at a time");
    }

    // // Upload images and get image IDs
    // const { successful, message, urls } = await cloudinaryService(files, 'project')
    // if (!successful) {
    //     return error(res, message);
    // }

    // // Get image IDs from URLs
    // const imageIds = urls.map(url => ({}));

    try {
        const updatedProject = await updateProjectService(parseInt(id), data, images);
        return success(res, updatedProject, `Project with id: ${id} updated successfully`);
    } catch (error) {
        return error(res, (error as Error).message);
    }

}