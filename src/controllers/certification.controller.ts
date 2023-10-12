import { Request, Response, NextFunction } from "express";
import { success, error } from "../utils/response.util";
import { updateACertificate } from "../services/certification.service";
import { CertificationInterface } from "../interfaces/cerification.interface"

const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const isValidCertification = (payload: any): payload is CertificationInterface => {
   return (
     typeof payload.title === "string" &&
     typeof payload.year === "string" &&
     typeof payload.organization === "string" &&
     typeof payload.url === "string" &&
     typeof payload.description === "string"
   );
};
 
export const updateCertificate = async (req: Request, res: Response) => {
   try {
      const id = parseInt(req.params.id)
      const userId = req.params.userId
      const payload = req.body

      if (!id || typeof id !== "number" || !userId || !uuidPattern.test(userId)) {
         return res.status(400).json({
           success: false, 
           message: "Please provide an integer id and a valid UUID user id as parameters"
         })
      }

      if (!isValidCertification(payload)) {
         return res.status(400).json({
            success: false,
            message: "Payload should be in the format below",
            format: {
               title: "string",
               year: "string",
               organization: "string",
               url: "string",
               description: "string",
            }
         });
      };

      const data = await updateACertificate(id, userId, payload)
      if (data.successful) {
         success(res, data)
      } else {
         error(res, data.message);
      }
   } catch (error: any) {
      return error(res, error.message)
   }
}