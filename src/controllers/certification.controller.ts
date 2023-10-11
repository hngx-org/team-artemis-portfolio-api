import { Request, Response, NextFunction } from "express";
import { success, error } from "../utils/response.util";
import { number } from "joi";
import { updateACertification } from "../services/certification.service";


export const updateCertification = async (req: Request, res: Response) => {
   try {
      const id = parseInt(req.params.id)
      const userId = req.user.id

      if (!id) {
         return (res as any).status(400).json({
           success: false, 
           message: "Please input certification id as a number"
         })
      }

      const data = await updateACertification(id, userId, req.body)
      if (data.successful) {
         success(res, data)
      } else {
         error(res, data.message);
      }
   } catch (error: any) {
      return error(res, error.message)
   }
}