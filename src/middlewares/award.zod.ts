import { ZodError, z } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../middlewares'
import { parseAsync, ErrorMessageOptions } from 'zod-error'
import { validate as isUUID } from 'uuid'

const urlRegex = new RegExp(
  '^((ft|htt)ps?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$',
  'i'
)

const charRegex = /^[a-zA-Z0-9\s]+$/

const CreateAwardDataSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(charRegex, { message: 'Title cannot contain special characters' }),
  year: z.string().min(3),
  presented_by: z
    .string()
    .min(3, { message: 'field cannot be empty' })
    .regex(charRegex, { message: 'Title cannot contain special characters' }),
  url: z
    .string()
    .min(3, { message: 'field cannot be empty' })
    .optional()
    .refine(
      (value) => {
        if (value) {
          return urlRegex.test(value)
        }
        return true
      },
      { message: 'Invalid URL format' }
    ),
  userId: z
    .string()
    .min(3)
    .refine((value) => isUUID(value), {
      message: 'userId has to be a valid UUID',
    }),
})

export const UpdateAwardDataSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(charRegex, { message: 'Title cannot contain special characters' })
    .optional(),
  year: z.string().min(3),
  presented_by: z
    .string()
    .min(3, { message: 'field cannot be empty' })
    .regex(charRegex, { message: 'Title cannot contain special characters' })
    .optional(),
  url: z
    .string()
    .min(3, { message: 'field cannot be empty' })
    .optional()
    .refine(
      (value) => {
        if (value) {
          return urlRegex.test(value)
        }
        return true
      },
      { message: 'Invalid URL format' }
    ),
  userId: z.string().refine((value) => isUUID(value), {
    message: 'userId has to be a valid UUID',
  }),
})

// Custom function to validate date strings in "yyyy" format
function validateDateYYYY(dateString: string) {
  const datePattern = /^\d{4}$/
  return datePattern.test(dateString)
}

const options: ErrorMessageOptions = {
  delimiter: {
    error: ' 🔥 ',
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
}

async function validateCreateAwardData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body

    // Validate date strings in "yy-mm-dd" format
    if (data.year && !validateDateYYYY(data.year)) {
      throw new BadRequestError(
        "Invalid 'year' date format, it must be 'yyyy' "
      )
    }

    // Retrieve the "userId" from request parameters
    const userId = req.params.userId

    // Validate the rest of the data against the schema
    const result = await parseAsync(CreateAwardDataSchema, {
      ...data,
      userId,
      options,
    })

    // Store the validated data in the request object if needed
    const validatedData = result
    console.log(validatedData)
    next() // Continue to the next middleware or route handler
  } catch (error) {
    const err = new BadRequestError(error.message)
    // return res.status(400).json({
    //   success: false,
    //   message: error.message,
    // })
    //  let message = 'Invalid input'
    const errorMessage = error.message.split(':').pop().trim()
    console.log(errorMessage)

    next(new BadRequestError(errorMessage))
  }
}

async function validateUpdateAwardData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body

    // Validate date strings in "yyyy" format
    if (data.year && !validateDateYYYY(data.year)) {
      const err = new BadRequestError(
        "Invalid 'year' date format, it must be 'yyyy'"
      )
      return res.status(err.statusCode).json({ error: err.message })
    }

    // Validate the data against the schema
    const result = await parseAsync(UpdateAwardDataSchema, data, options)

    const validatedData = result
    console.log(validatedData)
    next()
  } catch (error) {
    const err = new BadRequestError(error.message)
    console.error(err.message)
    res.status(err.statusCode).json({ error: err.message })
  }
}
export { validateCreateAwardData, validateUpdateAwardData }
