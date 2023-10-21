import { ZodError, z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";

// function isValidString(value) {
//   // Regular expression to allow  alphanumeric characters spaces, comma, fullstotp and question mark
//   const regex = /^[A-Za-z0-9,.\s!?']+$/;
//   return regex.test(value);
// }

// function checkValidString(value, fieldName) {
//   if (!isValidString(value)) {
//     throw new BadRequestError(`The '${fieldName}' contains invalid characters`);
//   }
// }

function checkNotEmptyString(value, fieldName) {
  if (!value /*|| value.trim().length === 0*/) {
    throw new BadRequestError(`The '${fieldName}' cannot be an empty string`);
  }
  // checkValidString(value, fieldName);
}

export const CreateAboutDataSchema = z.object({
  bio: z.string().min(3).max(1000).nullable(),
  section_id: z.number().optional(),
  //user_id: z.string().refine((value) => isUUID(value), {
  //  message: "userId has to be a valid UUID",
  // }),
});

async function validateUserId(userId: string) {
  const userIdSchema = z.string().trim().uuid("userId must be in UUID format");

  try {
    userIdSchema.parse(userId)
  } catch(err) {
    const { errors } = err as ZodError;
    throw new BadRequestError(errors[0].message)
  }
}

async function validateAboutId(id:unknown) {
  const aboutIdSchema = z.number({
    required_error: "id is required in params",
    invalid_type_error: "is must be a number"
  }).int("id must be an integer")

  try {
    aboutIdSchema.parse(id)
  } catch (err) {
    const { errors } = err as ZodError;
    throw new BadRequestError(errors[0].message)
  }
}

async function ValidateCreateAbout(data: any) {
  try {
    checkNotEmptyString(data.bio, "bio");
    const result = await parseAsync(
      CreateAboutDataSchema,
      data,

      options
    );
    console.log(result);
    return result;
  } catch (error) {
    throw new BadRequestError(error.message);
    return;
  }
}

const options: ErrorMessageOptions = {
  delimiter: {
    error: " # ",
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};

export const UpdateAboutDataSchema = z.object({
  bio: z.string().min(3).max(1000),
  section_id: z.number().optional(),
  user_id: z.string().optional(),
});

async function ValidateUpdateAbout(data: any) {
  try {
    // check for empty string
    checkNotEmptyString(data.bio, "bio");

    const result = await parseAsync(UpdateAboutDataSchema, data, options);
    const validatedData = result;
    console.log(validatedData);
    return validatedData;
  } catch (error) {
    throw new BadRequestError(error.message);
  }
}

export { ValidateCreateAbout, ValidateUpdateAbout, validateUserId, validateAboutId };
