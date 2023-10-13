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
import {
  ICustomSection,
  ISection,
  IField,
  IGetSection,
  IGetSingleSection,
  IUpdateSection,
} from "../interfaces";

const customRepository = connectionSource.getRepository(CustomUserSection);
const customFieldRepository = connectionSource.getRepository(CustomField);
const sectionRepository = connectionSource.getRepository(Section);

const MAX_ID_LENGTH = 10;

const sectionIdSchema = z
  .number()
  .int()
  .refine((value) => {
    if (value <= 0) {
      throw new Error("Number must be greater than 0");
    }
    return true;
  });

export const validateSectionId = (sectionId: any, res: Response) => {
  try {
    const parsedSectionId = parseInt(sectionId);

    if (isNaN(parsedSectionId) || !Number.isInteger(parsedSectionId)) {
      throw new Error("Invalid section ID. Must be a valid integer.");
    }

    sectionIdSchema.parse(parsedSectionId);

    if (parsedSectionId.toString().length > MAX_ID_LENGTH) {
      throw new Error(`Section ID must have at most ${MAX_ID_LENGTH} digits`);
    }

    return true;
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

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
    const positionExists = await sectionRepository.findOne({
      where: { position: req.body.position },
    });
    if (positionExists)
      return error(res, "A section with this position already exist", 400);
    const newRecord = await sectionRepository.save(req.body);
    return success(res, newRecord, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

const getSection = async (
  req: Request<{}, {}, {}, IGetSection>,
  res: Response
) => {
  const filter = req.query.name ? { where: { name: req.query.name } } : {};
  try {
    const section = await sectionRepository.find(filter);
    return success(res, section, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

const getSingleSection = async (
  req: Request<IGetSingleSection, {}, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const section = await sectionRepository.findOne({
      where: { id },
    });
    if (!section) return error(res, "Section not found", 404);
    return success(res, section, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

const UpdateSection = async (
  req: Request<{ id: string }, {}, IUpdateSection, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const section = await sectionRepository.findOne({
      where: { id: Number(id) },
    });
    if (!section) return error(res, "Section not found", 404);
    if (req.body.position) {
      const positionExists = await sectionRepository.findOne({
        where: { position: req.body.position },
      });
      if (positionExists)
        return error(res, "A section with this position already exist", 400);
    }
    await sectionRepository.update(id, req.body);
    const newsection = await sectionRepository.findOne({
      where: { id: Number(id) },
    });
    return success(res, newsection, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

const deleteSection = async (
  req: Request<IGetSingleSection, {}, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const section = await sectionRepository.findOne({
      where: { id },
    });
    if (!section) return error(res, "Section not found", 404);
    await sectionRepository.delete(id);
    return success(res, true, "Success");
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
    const sectionId = parseInt(req.params.id);
    if (!validateSectionId(sectionId, res)) {
      return;
    }
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
          return;
        }
        if (!customUserSection) {
          errors.push(
            `Invalid customUserSectionId for field: ${field.fieldName}`
          );
          return;
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
    const sectionId = parseInt(req.params.id);

    if (!validateSectionId(sectionId, res)) {
      return;
    }

    const record = await customFieldRepository.findOne({
      where: { id: Number(id) },
    });

    if (record) {
      return success(res, record, "Success");
    } else {
      return res.status(400).json({
        successful: false,
        message: "Record not found",
        data: null,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        successful: false,
        message: "Invalid request data",
        data: {
          error: error.message,
          statusCode: 400,
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      console.error(error);
      return res.status(500).json({
        successful: false,
        message: "An error occurred",
        data: null,
      });
    }
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
  position: z.number().positive(),
  description: z.string().optional(),
  meta: z.string().optional(),
});

const updateSectionSchema: AnyZodObject = z
  .object({
    name: z
      .string()
      .min(3, { message: "name must have at least three characters " })
      .optional(),
    description: z.string().optional(),
    meta: z.string().optional(),
    position: z.number().positive().optional(),
  })
  .refine(
    (data) => {
      return (
        data.name !== undefined ||
        data.description !== undefined ||
        data.meta !== undefined ||
        data.position !== undefined
      );
    },
    {
      message:
        "At least one of the fields (name, description, meta, position) is required",
    }
  ); ;

const getSectionSchema = z.object({
  name: z.string().optional(),
});

const validateSchema =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: any) => {
    try {
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
  try {
    const id = parseInt(req.params.id);

    const customFieldSchema = z.object({
      fieldType: z.string({ invalid_type_error: "fieldType must be a string" }),
      fieldName: z.string({ invalid_type_error: "fieldName must be a string" }),
      customSectionId: z
        .number()
        .int({ message: "customSectionId must be an integer" }),
      value: z.string({ invalid_type_error: "value must be a string" }),
    });

    const data = customFieldSchema.safeParse(req.body);

    if (data.success === false) {
      const err = new BadRequestError(data.error.message);
      return res
        .status(err.statusCode)
        .json({ err: JSON.parse(err.message)[0].message });
    }

    // validator for idValidator
    const idValidator = z
      .number({
        required_error: "id is required",
        invalid_type_error: "id must be a number",
      })
      .int({ message: "id must be an integer" })
      .positive({ message: "id must be a positive integer" });

    const idValidate = idValidator.safeParse(id);

    if (idValidate.success === false) {
      const err = new BadRequestError(idValidate.error.message);
      return res
        .status(err.statusCode)
        .json({ err: JSON.parse(err.message)[0].message });
    }

    const existingRecord = await customFieldRepository.findOne({
      where: { id: Number(id) },
    });
    if (!existingRecord) {
      return error(res, "Record not found", 404);
    }

    existingRecord.fieldType = req.body.fieldType;
    existingRecord.fieldName = req.body.fieldName;
    existingRecord.customSectionId = req.body.customSectionId;
    existingRecord.value = req.body.value;
    const updatedRecord = await customFieldRepository.save(existingRecord);
    return success(res, updatedRecord, "Success");
  } catch (error: any) {
    const err = new InternalServerError(error.message);
    return res.status(err.statusCode).json({ err: err.message });
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
  // updateCustomSection,
  sectionSchema,
  fieldsSchema,
  getSection,
  getSingleSection,
  getSectionSchema,
  UpdateSection,
  deleteSection,
  updateSectionSchema,
};
