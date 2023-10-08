import express, { Request, RequestHandler, Response } from "express";
import { getProjectsService } from "../services/project.service";
import { error, success } from "../utils";

export const getProjectDetails: RequestHandler = async (req: Request, res: Response) => {
    const {id} = req.params
   try{
        // const authorization
    // fetch project details for the logged in user based on their id
    const data = await getProjectsService(id)
    // Send a response with the fetched details
    return success(res, data, "Projects")

   } catch (err) {
       console.error("Error fetching Projects:", error)
       error(res, (err as Error).message)
   }
}