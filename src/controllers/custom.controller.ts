import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { AnyZodObject } from "zod";
import { z } from "zod";
import { CustomUserSection, CustomField } from "../database/entity/model";
import { success, error } from "../utils/response.util";
import { v4 as isUUIDv4 } from "uuid";

const customRepository = connectionSource.getRepository(CustomUserSection);
const customFieldRepository = connectionSource.getRepository(CustomField);

const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    if (!isUUIDv4(req.body.userId) || !req.body.sectionId)
      return error(res, "Please fill all fields correctly", 400);
    const newRecord = await customRepository.save(req.body);
    return success(res, newRecord, "Success");
  } catch (err) {
    console.log(err);
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

const findAllCustomField = async (req: Request, res: Response) => {
  try {
    const records = await customFieldRepository.find({});
    return res.status(200).json(records);
    // return success(res, records, "Success");
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
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: `invalid body parameter(s)`,
        data: {
          error: error.issues,
          statusCode: 400,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };

export {
  create,
  findAll,
  findOne,
  createCustomField,
  findAllCustomField,
  findOneCustomField,
  validateSchema,
  customUserSectionSchema,
  customFieldSchema,
};
