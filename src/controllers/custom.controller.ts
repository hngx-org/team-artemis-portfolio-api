import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { AnyZodObject, z } from "zod";
import {
  CustomUserSection,
  CustomField,
  Section,
} from "../database/entity/model";
import { success, error } from "../utils/response.util";
import { v4 as isUUIDv4 } from "uuid";
import { deleteCustomSectionService } from "../services/custom.service";

const customRepository = connectionSource.getRepository(CustomUserSection);
const customFieldRepository = connectionSource.getRepository(CustomField);

export const deleteCustomSection = async (req: Request, res: Response) => {
  try {
    const customId = parseInt(req.params.id);
    const { userId } = req.body;

    const customIdValidator = z
      .number({
        required_error: "id is required",
        invalid_type_error: "id must be a number",
      })
      .int({ message: "id must be an integer" })
      .positive({ message: "must be a positive integer" });

    const userIdValidator = z
      .string({
        required_error: "userId is required",
        invalid_type_error: "userId must be uuid",
      })
      .uuid({ message: "userId must be of type uuid" });

    const customIdValidate = customIdValidator.safeParse(customId);
    const userIdValidate = userIdValidator.safeParse(userId);

    if (customIdValidate.success === false) {
      return error(res, customIdValidate.error.message);
    }

    if (userIdValidate.success === false) {
      return error(res, userIdValidate.error.message);
    }
    const data = await deleteCustomSectionService(customId, userId);
    if (data.successful) {
      return success(res, data);
    } else {
      return error(res, data.message);
    }
  } catch (error: any) {
    return res.send(error); //error(res, error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    console.log((req as any).body);
    if (!isUUIDv4(req.body.userId) || !req.body.sectionId)
      return error(res, "Please fill all fields correctly", 400);
    const newRecord = await customRepository.save(req.body);
    return success(res, newRecord, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

const findAll = async (req: Request, res: Response) => {
  try {
    const records = await customRepository.find(req.body);
    return success(res, records, "Success");
  } catch (err) {
    console.log(err);
  }
};

const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const record = await customRepository.findOne({
      where: { id: Number(id) },
    });
    return record
      ? success(res, record, "Success")
      : error(res, "record not found", 400);
  } catch (err) {
    console.log(err);
  }
};

const createCustomField = async (req: Request, res: Response) => {
  try {
    if (
      !req.body.fieldType ||
      !req.body.fieldName ||
      !req.body.customSectionId ||
      !req.body.value
    )
      return error(
        res,
        "Please fill all fields correctly fieldType, fieldName ,customSectionId, value",
        400
      );
    const newRecord = await customFieldRepository.save(req.body);
    return success(res, newRecord, "Success");
  } catch (err) {
    console.log(err);
  }
};

const findOneCustomField = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const record = await customFieldRepository.findOne({
      where: { id: Number(id) },
    });
    return record
      ? success(res, record, "Success")
      : error(res, "record not found", 400);
  } catch (err) {
    console.log(err);
  }
};

const customUserSectionSchema = z.object({
  userId: z.string().uuid(),
  sectionId: z.number(),
});

const customFieldSchema = z.object({
  id: z.number(),
  fieldType: z
    .string()
    .min(3, { message: "fieldType must have at least three characters " }),
  fieldName: z
    .string()
    .min(3, { message: "fieldName must have at least three characters " }),
  customSectionId: z.string(),
  value: z.string().nullable(),
});

const validateSchema =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: any) => {
    try {
      console.log(req.body);
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: `invalid request data`,
        data: {
          error: error.issues,
          statusCode: 400,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };

// updated customsection field
const updateCustomField = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingRecord = await customFieldRepository.findOne({
      where: { id: Number(id) },
    });
    if (!existingRecord) {
      return error(res, "Record not found", 400);
    }
    // Update the existing record with the new data from the request body
    existingRecord.fieldType = req.body.fieldType;
    existingRecord.fieldName = req.body.fieldName;
    existingRecord.customSectionId = req.body.customSectionId;
    existingRecord.value = req.body.value;
    const updatedRecord = await customFieldRepository.save(existingRecord);
    return success(res, updatedRecord, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred while updating the record", 500);
  }
};

export {
  create,
  findAll,
  findOne,
  createCustomField,
  findOneCustomField,
  validateSchema,
  updateCustomField,
  customUserSectionSchema,
  customFieldSchema,
};
