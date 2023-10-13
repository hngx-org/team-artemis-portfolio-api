import { ZodError, z } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../middlewares'
import { parseAsync, ErrorMessageOptions } from 'zod-error'
import { validate as isUUID } from 'uuid'

export const CreateEducationDetailDataSchema = z.object({
  degreeId: z.number(),
  fieldOfStudy: z.string(),
  school: z.string(),
  from: z.string(),
  description: z.string().optional(),
  to: z.string(),
  userId: z.string().refine((value) => isUUID(value), {
    message: 'userId has to be a valid UUID',
  }),
})

// Custom function to validate date strings in "yy-mm-dd" format
function validateDateYYMMDD(dateString: string) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  return datePattern.test(dateString)
}

const EducationDetailDataSchema = z.object({
  fieldOfStudy: z.string().optional(),
  school: z.string().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  description: z.string().optional(),
  degreeId: z.number().optional(),
  userId: z.number().optional(),
  sectionId: z.number().optional(),
})

const options: ErrorMessageOptions = {
  delimiter: {
    error: ' 🔥 ',
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
}

async function validateUpdateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body
    console.log('starting validate')

    if (!req.body) {
      throw new BadRequestError('Missing request body')
    }

    // Validate date strings in "yy-mm-dd" format
    if (data.from && !validateDateYYMMDD(data.from)) {
      throw new BadRequestError("Invalid 'from' date format")
    }

    if (data.to && !validateDateYYMMDD(data.to)) {
      throw new BadRequestError("Invalid 'to' date format")
    }

    // Convert date strings to Date objects
    if (data.from) {
      data.from = new Date(data.from)
    }

    if (data.to) {
      data.to = new Date(data.to)
    }
    const result = await parseAsync(EducationDetailDataSchema, data, options)

    const validatedData = result // Store the validated data in the request object if needed
    console.log(validatedData)
    next() // Continue to the next middleware or route handler
  } catch (error) {
    const err = new BadRequestError(error.message);
    return res.status(err.statusCode).json({ message: err.message });
  }
}

async function validateCreateData(data: any, userId: string, res: Response) {

  try {
    // Validate date strings in "yy-mm-dd" format
    if (data.from && !validateDateYYMMDD(data.from)) {
      return res.status(400).json({ errors: "Invalid 'from' date format" })
      // throw new BadRequestError("Invalid 'from' date format")
    }

    if (data.to && !validateDateYYMMDD(data.to)) {
      // throw new BadRequestError("Invalid 'to' date format")
      return res.status(400).json({ errors: "Invalid 'to' date format" })
    }

    // Validate the data against the schema
    await CreateEducationDetailDataSchema.parseAsync({
      ...data,
      userId,
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
  
}

export { validateUpdateData, validateCreateData, EducationDetailDataSchema }
