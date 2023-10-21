import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { AnyZodObject, z } from "zod";
import {
  CustomUserSection,
  CustomField,
  Section,
  User,
} from "../database/entities";
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
const userRepository = connectionSource.getRepository( User)

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

// export const deleteCustomSection = async (req: Request, res: Response) => {
//   try {
//     const customSectionId = parseInt(req.params.id);
//     const { userId } = req.body;

//     // validator for the custom section Id
//     const customSectionIdValidator = z
//       .number({
//         required_error: "id is required",
//         invalid_type_error: "id must be a number",
//       })
//       .int({ message: "id must be an integer" })
//       .positive({ message: "must be a positive integer" });

//     // validator for user ID
//     const userIdValidator = z
//       .string({
//         required_error: "userId is required",
//         invalid_type_error: "userId must be uuid",
//       })
//       .uuid({ message: "userId must be of type uuid" });

//     const userIdValidate = userIdValidator.safeParse(userId);
//     const customSectionIdValidate =
//       customSectionIdValidator.safeParse(customSectionId);

//     if (customSectionIdValidate.success === false) {
//       const err = new BadRequestError(customSectionIdValidate.error.message);
//       return res
//         .status(err.statusCode)
//         .json({ err: JSON.parse(err.message)[0].message });
//     }

//     if (userIdValidate.success === false) {
//       const err = new BadRequestError(userIdValidate.error.message);
//       return res
//         .status(err.statusCode)
//         .json({ err: JSON.parse(err.message)[0].message });
//     }

//     const data = await deleteCustomSectionService(customSectionId, userId);

//     if (data.successful) {
//       return success(res, data);
//     } else {
//       const err = new NotFoundError(data.message);
//       return res.status(err.statusCode).json({ err: err.message });
//     }
//   } catch (error: any) {
//     const err = new InternalServerError(error.message);
//     return res.status(err.statusCode).json({ err: err.message });
//   }
// };

const createSection = async (
  req: Request<{}, {}, ISection, {}>,
  res: Response
) => {
  try {
    console.log(req.body.name);
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
        // where: { position: req.body.position },
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
    const user = await userRepository.findOne({
      where: { id: req.body.userId },
    });
     if (!user) return error(res, "User not found", 400);
    const newRecord = new CustomUserSection();
    newRecord.user = user;
    newRecord.section = section;
    newRecord.titile = req.body.title;
    const record = await customRepository.save(newRecord);
    delete record.user.password;
    return success(res, record, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

export const getAllCustomSections = async (
  req: Request,
  res: Response
) => {
   const { id } = req.params;
  try {
     const user = await userRepository.findOne({
      where: { id },
    });
     if (!user) return error(res, "User not found", 400);
    const records = await customRepository.find({
      where: { user: { id } },
      relations: ["customFields"],
    });
    return success(res, records, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

const findAll = async (req: Request, res: Response) => {
  try {
    const records = await customRepository.find({
      relations: ["customFields", "section"],
    });
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
      relations: ["customFields", "section"],
    });
    return record
      ? success(res, record, "Success")
      : error(res, "record not found", 400);
  } catch (err) {
    console.log(err);
  }
};

export const updateCustomSection = async (
  req: Request<{ id: string }, {}, { userId: string; sectionId: number }, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const section = await customRepository.findOne({
      where: { id: Number(id) },
    });
    if (!section) return error(res, "Custom section not found", 404);
    const newRecord = new CustomUserSection();
    if (req.body.sectionId) {
      const section = await sectionRepository.findOne({
        where: { id: req.body.sectionId },
      });
      if (!section) return error(res, "Section does not exist", 400);
      newRecord.section = section;
    }
    await customRepository.update(id, newRecord);
    const custom = await customRepository.findOne({
      where: { id: Number(id) },
      relations: ["customFields", "section", "user"],
    });
    return success(res, custom, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

export const deleteCustomSection = async (
  req: Request<IGetSingleSection, {}, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const section = await customRepository.findOne({
      where: { id },
    });
    if (!section) return error(res, "Custom section not found", 404);
    await customRepository.delete(id);
    return success(res, true, "Success");
  } catch (err) {
    console.log(err);
    return error(res, "An error occurred", 500);
  }
};

const createCustomField = async (
  req: Request<{}, {}, IField, {}>,
  res: Response
) => {
  try {
    const customSection = await customRepository.findOne({
      where: { id: req.body.customUserSectionId },
    });
    if (!customSection) return error(res, "Custom section not found", 404);

    const newRecords = await Promise.all(
      req.body.fields.map(async (field) => {
        return customFieldRepository.save({
          ...field,
          customSection,
        });
      })
    );
    return success(res, newRecords, "Success");
  } catch (err) {
    console.error(err);
    return error(res, "An error occurred", 500);
  }
};

export const findAllCustomField = async (
  req: Request<{}, {}, {}, { customSection?: number }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: any = {};
    if (req.query.customSection)
      filter.customSection = { id: req.query.customSection };
    const records = await customFieldRepository.find({
      where: filter,
      relations: ["customSection"],
    });
    return success(res, records, "Success");
  } catch (err) {
    console.log(err);
    next(new InternalServerError(err.message))
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

export const deleteCustomFields = async (
  req: Request<IGetSingleSection, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {

  try {
    const { id } = req.params;
    const idValidator = z
    .number({
      required_error: "id is required",
      invalid_type_error: "id must be a number",
    })
    .int({ message: "id must be an integer" })
    .positive({ message: "id must be a positive integer" });
  
    idValidator.parse(parseInt(id as any));
    const field = await customFieldRepository.findOne({
      where: { id },
    });
    if (!field) throw new NotFoundError("Custom field not found");
    await customFieldRepository.delete(id);
    return success(res,undefined, "custom field deleted successfully");
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.issues.map((issue) => issue.message);
      const errors = errorMessages.join("; ");
      next(new BadRequestError(errors));
    }
     next(new InternalServerError(err.message));
  }
};
const customUserSectionSchema = z.object({
  sectionId: z.number(),
  title: z
    .string()
    .min(3, { message: "title must have at least three characters " })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "title must contain only letters (A-Z, a-z)",
    }),
  userId: z.string().uuid().min(3)
});

const customGetUserSectionSchema = z.object({
  userId: z.string().uuid().min(3)
});

const customFieldSchema = z.object({
  fieldType: z
    .string()
    .min(3, { message: "fieldType must have at least three characters " })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Field must contain only letters (A-Z, a-z)",
    }),
  fieldName: z
    .string()
    .min(3, { message: "fieldName must have at least three characters " })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Field must contain only letters (A-Z, a-z)",
    }),
  value: z.string().nullable(),
});

const fieldsSchema = z.object({
  customUserSectionId: z.number(),
  fields: z
    .array(customFieldSchema)
    .min(1, { message: "At least one custom field is required" }),
});

const sectionSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must have at least three characters " })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Field must contain only letters (A-Z, a-z)",
    }),
  description: z
    .string()
    .min(3, { message: "description must have at least three characters " })
    .optional()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Field must contain only letters (A-Z, a-z)",
    }),
  meta: z
    .string()
    .min(3, { message: "meta must have at least three characters " })
    .optional()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Field must contain only letters (A-Z, a-z)",
    }),
});

const updateSectionSchema: any = z
  .object({
    name: z
      .string()
      .min(3, { message: "name must have at least three characters " })
      .optional(),
    description: z.string().optional(),
    meta: z.string().optional(),
  })
  .refine(
    (data) => {
      return (
        data.name !== undefined ||
        data.description !== undefined ||
        data.meta !== undefined
      );
    },
    {
      message:
        "At least one of the fields (name, description, meta, position) is required",
    }
  );

const updateCustomSectionSchema: any = z.object({
  sectionId: z.number().positive(),
});

const getSectionSchema = z.object({
  name: z.string().optional(),
});

export const getcustomfieldsSchema: any = z.object({
  customSection: z.string().optional(),
});
// .refine(
//   (data) => {
//     return Number(data) > 0;
//   },
//   {
//     message: "Number must be greater than 0",
//   }
// );

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
const updateCustomField = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);

    const customFieldSchema = z.object({
      fieldType: z
        .string()
        .min(3)
        .refine((value) => !/^\s*$/.test(value), {
        message: "The string must not be empty or consist of only spaces",
      }).optional(),
      fieldName: z.string()
      .min(3)
      .refine((value) => !/^\s*$/.test(value), {
        message: "The string must not be empty or consist of only spaces",
      }).optional(),
      customSectionId: z
        .number()
        .int().optional(),
      value: z.string()
      .min(3)
      .refine((value) => !/^\s*$/.test(value), {
        message: "The string must not be empty or consist of only spaces",
      }).optional(),
    });

   customFieldSchema.parse(req.body);

    

    // validator for idValidator
    const idValidator = z
      .number({
        required_error: "id is required",
        invalid_type_error: "id must be a number",
      })
      .int({ message: "id must be an integer" })
      .positive({ message: "id must be a positive integer" });

    idValidator.parse(id);

    
    const { customSectionId } = req.body;
    const existingRecord = await customFieldRepository.findOne({
      where: { id: Number(id) },
    });
    if (!existingRecord) {
      return error(res, "Record not found", 404);
    }
    const currCustomUserSection = await customRepository.findOne({
      where: { id: customSectionId },
    });

    existingRecord.fieldType = req.body.fieldType;
    existingRecord.fieldName = req.body.fieldName;
    existingRecord.customSection = currCustomUserSection;
    existingRecord.value = req.body.value;
    const updatedRecord = await customFieldRepository.save(existingRecord);
    return success(res, updatedRecord, "field updated successfully")
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.issues.map((issue) => `${issue.path}: ${issue.message}`);
      const errors = errorMessages.join("; ");
      next(new BadRequestError(errors));
    }
     next(new InternalServerError(err.message));
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
  updateCustomSectionSchema,
  customGetUserSectionSchema 
};