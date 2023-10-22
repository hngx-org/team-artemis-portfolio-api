import z, { ZodError } from "zod";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const hashPassword = async (plainPassword: string) => {
  const salt = 10;
  return bcrypt.hash(plainPassword, salt);
};

export const verifyPassword = async (
  plainPassword: string,
  hashPassword: any
) => {
  return bcrypt.compare(plainPassword, hashPassword);
};

// input validation
export const accountSettingSchema = z
  .object({
    email: z.string({
      required_error: "email is Required",
    }),
    currentPassword: z.string({
      required_error: "password is Required",
    }),
    newPassword: z
      .string({
        required_error: "password is Required",
      })
      .min(5, { message: "Must be 5 or more characters long" })
      .max(18, { message: "Must be 18 or fewer characters long" }),
    confirmNewPassword: z
      .string({
        required_error: "password is Required",
      })
      .min(5, { message: "Must be 5 or more characters long" })
      .max(18, { message: "Must be 18 or fewer characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Oops! Passwords doesnt match",
  });

// notification input validation
export const notificationSettingSchema = z.object({
  communityUpdate: z.boolean({
    required_error: "communityUpdate is required",
    invalid_type_error: "communityUpdate must be a boolean",
  }),
  emailSummary: z.boolean({
    required_error: "emailSummary is required",
    invalid_type_error: "emailSummary must be a boolean",
  }),
  newMessages: z.boolean({
    required_error: "newMessages is required",
    invalid_type_error: "newMessages must be a boolean",
  }),
  followUpdate: z.boolean({
    required_error: "followUpdate is required",
    invalid_type_error: "followUpdate must be a boolean",
  }),
  specialOffers: z.boolean({
    required_error: "specialOffers is required",
    invalid_type_error: "specialOffers must be a boolean",
  }),
});

export const updateNotificationSettingSchema = z.object({
  communityUpdate: z
    .boolean({
      required_error: "communityUpdate is required",
      invalid_type_error: "communityUpdate must be a boolean",
    })
    .optional(),
  emailSummary: z
    .boolean({
      required_error: "emailSummary is required",
      invalid_type_error: "emailSummary must be a boolean",
    })
    .optional(),
  newMessages: z
    .boolean({
      required_error: "newMessages is required",
      invalid_type_error: "newMessages must be a boolean",
    })
    .optional(),
  followUpdate: z
    .boolean({
      required_error: "followUpdate is required",
      invalid_type_error: "followUpdate must be a boolean",
    })
    .optional(),
  specialOffers: z
    .boolean({
      required_error: "specialOffers is required",
      invalid_type_error: "specialOffers must be a boolean",
    })
    .optional(),
});

// validate User Id
export const validateUserId = [
  check("userId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("user's id cannot be empty!"),
];

// Valation Error
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.status(400).json({
      status: `error`,
      message: { error: error[0].msg },
      success: false,
    });
  }

  next();
};

export const validateNotificataionSettingsData = async (
  req: Request,
  res: Response,
  isUpdate: boolean = false
) => {
  let isValidData: boolean;

  try {
    if (isUpdate) {
      await updateNotificationSettingSchema.parseAsync(req.body);
    } else {
      await notificationSettingSchema.parseAsync(req.body);
    }
    isValidData = true;
  } catch (err) {
    const { errors } = err as ZodError;

    const errorMessages = errors.map((error) => {
      return {
        field: error.path.join("."),
        message: error.message,
      };
    });

    errorResponse(req, res, errorMessages);
    isValidData = false;
  }

  return isValidData;
};

const errorResponse = (
  req: Request,
  res: Response,
  message: any,
  statusCode?: number
) => {
  res.status(400).json({
    timestamp: new Date().toISOString(),
    status: 400,
    error: "BadRequest Error",
    message: message,
    path: req.path,
    success: false,
  });
};
