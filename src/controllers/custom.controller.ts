import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { AnyZodObject, z } from "zod";
import {
  CustomUserSection,
  CustomField,
  Section,
} from "../database/entity/model";
import { success, error } from "../utils/response.util";
import { deleteCustomSectionService } from "../services/custom.service";
import {
  BadRequestError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "../middlewares";
import { ICustomSection, ISection, IField } from "../interfaces";

const customRepository = connectionSource.getRepository(CustomUserSection);
const customFieldRepository = connectionSource.getRepository(CustomField);
const sectionRepository = connectionSource.getRepository(Section);

export const deleteCustomSection = async (req: Request, res: Response) => {
  try {
    const customSectionId = parseInt(req.params.id);
    const { userId } = req.body;

    // validator for the custom section Id
    const customSectionIdValidator = z
      .number({
        required_error: "id is required",
        invalid_type_error: "id must be a number",
      })
      .int({ message: "id must be an integer" })
      .positive({ message: "must be a positive integer" });

    // validator for user ID
    const userIdValidator = z
      .string({
        required_error: "userId is required",
        invalid_type_error: "userId must be uuid",
      })
      .uuid({ message: "userId must be of type uuid" });

    const userIdValidate = userIdValidator.safeParse(userId);
    const customSectionIdValidate =
      customSectionIdValidator.safeParse(customSectionId);

    if (customSectionIdValidate.success === false) {
      const err = new BadRequestError(customSectionIdValidate.error.message);
      return res
        .status(err.statusCode)
        .json({ err: JSON.parse(err.message)[0].message });
    }

    if (userIdValidate.success === false) {
      const err = new BadRequestError(userIdValidate.error.message);
      return res
        .status(err.statusCode)
        .json({ err: JSON.parse(err.message)[0].message });
    }

    const data = await deleteCustomSectionService(customSectionId, userId);

    if (data.successful) {
      return success(res, data);
    } else {
      const err = new NotFoundError(data.message);
      return res.status(err.statusCode).json({ err: err.message });
    }
  } catch (error: any) {
    const err = new InternalServerError(error.message);
    return res.status(err.statusCode).json({ err: err.message });
  }
};

const createSection = async (
  req: Request<{}, {}, ISection, {}>,
  res: Response
) => {
  try {
    const sectionExists = await sectionRepository.findOne({
      where: { name: req.body.name },
    });
    if (sectionExists)
      return error(
        res,
        "A section with this name has already been created",
        400
      );
    const newRecord = await sectionRepository.save(req.body);
    return success(res, newRecord, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

const create = async (
  req: Request<{}, {}, ICustomSection, {}>,
  res: Response
) => {
  try {
    const section = await sectionRepository.findOne({
      where: { id: req.body.sectionId },
    });
    if (!section) return error(res, "SectionId does not exist", 400);
    const alreadyCreated = await customRepository.findOne({
      where: { userId: req.body.userId },
    });
    if (alreadyCreated)
      return error(
        res,
        "A custom section for this user has already been created",
        400
      );
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

const createCustomField = async (
  req: Request<{}, {}, IField, {}>,
  res: Response
) => {
  const errors = [];
  try {
    const newRecords = await Promise.all(
      req.body.fields.map(async (field) => {
        const section = await sectionRepository.findOne({
          where: { id: field.customSectionId },
        });
        const customUserSection = await customRepository.findOne({
          where: { id: field.customUserSectionId },
        });

        if (!section) {
          errors.push(`Invalid customSectionId for field: ${field.fieldName}`);
        }
        if (!customUserSection) {
          errors.push(
            `Invalid customUserSectionId for field: ${field.fieldName}`
          );
        }

        return customFieldRepository.save(field);
      })
    );

    if (errors.length > 0) return error(res, errors.join("\n"), 400);
    return success(res, newRecords, "Success");
  } catch (err) {
    console.error(err);
    return error(res, "An error occurred", 500);
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
  fieldType: z
    .string()
    .min(3, { message: "fieldType must have at least three characters " }),
  fieldName: z
    .string()
    .min(3, { message: "fieldName must have at least three characters " }),
  customSectionId: z.number(),
  customUserSectionId: z.number(),
  value: z.string().nullable(),
});

const fieldsSchema = z.object({
  fields: z
    .array(customFieldSchema)
    .min(1, { message: "At least one custom field is required" }),
});

const sectionSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must have at least three characters " }),
  description: z.string().optional(),
  meta: z.string().optional(),
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
  createSection,
  sectionSchema,
  fieldsSchema,
};
