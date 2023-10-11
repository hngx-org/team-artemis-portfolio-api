import { Request, Response, NextFunction } from "express";
import { success, error } from "../utils/response.util";
import { updateACertificate } from "../services/certification.service";


export const updateCertificate = async (req: Request, res: Response) => {
   try {
      const id = parseInt(req.params.id)
      const userId = req.params.userId

      if (!id || !userId) {
         return (res as any).status(400).json({
           success: false, 
           message: "Please provide as a parameter an integer id"
         })
      }

      const data = await updateACertificate(id, userId, req.body)
      if (data.successful) {
         success(res, data)
      } else {
         error(res, data.message);
      }
   } catch (error: any) {
      return error(res, error.message)
   }
}