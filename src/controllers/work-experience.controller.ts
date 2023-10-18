import { Request, RequestHandler, Response } from "express";
import { connectionSource } from "../database/data-source";
import { WorkExperienceDetail } from "../database/entities";
import { error, success } from "../utils";
import { ZodError, boolean, number, object, string } from "zod";

// Get the repository for the WorkExperienceDetail entity
const workExperienceRepository =
  connectionSource.getRepository(WorkExperienceDetail);

export const createWorkExperience: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {
    company,
    role,
    startMonth,
    startYear,
    endMonth,
    endYear,
    description,
    isEmployee,
    sectionId,
  } = req.body;

  const userId = req.params.userId || req.body.userId;


  const workExperienceSchema = object({
    company: string({
      required_error: "company is required in request body",
      invalid_type_error: "company must be type string"
    })
      .trim()
      .min(1, "company must not be an empty string"),

    role: string({
      required_error: "role is required in request body",
      invalid_type_error: "role must be type string"
    })
      .trim()
      .min(1, "role must not be an empty string"),

    startMonth: string({
      required_error: "startMonth is required in request body",
      invalid_type_error: "startMonth must be type string"
    })
      .trim()
      .min(1, "startMonth must not be an empty string"),

    startYear: string({
      required_error: "startYear is required in request body",
      invalid_type_error: "startYear must be type string"
    })
      .trim()
      .min(1, "startYear must not be an empty string")
      .length(4, "startYear must be 4 digits"),

    endMonth: string({
      required_error: "endMonth is required in request body",
      invalid_type_error: "endMonth must be type string"
    })
      .trim()
      .min(1, "endMonth must not be an empty string"),

    endYear: string({
      required_error: "endYear is required in request body",
      invalid_type_error: "endYear must be type string"
    })
      .trim()
      .min(1, "endYear must not be an empty string")
      .length(4, "endYear must be 4 digits"),

    description: string({
      required_error: "description is required in request body",
      invalid_type_error: "description must be type string"
    })
      .trim()
      .min(1, "description must not be an empty string"),

    isEmployee: boolean({
      required_error: "isEmployee is required in request body",
      invalid_type_error: "isEmployee must be type boolean"
    }),

    userId: string({
      required_error: "userId is required in request body",
      invalid_type_error: "userId must be type string"
    })
      .trim()
      .min(1, "userId must not be an empty string")
      .uuid("userId must be in uuid format"),

    sectionId: number({
      required_error: "sectionId is required in request body",
      invalid_type_error: "sectionId must be type number"
    })
  })



  try {

    try {
      workExperienceSchema.parse(req.body);
    } catch (err: unknown) {
      const { errors } = err as ZodError;

      const errorMessages = errors.map((error) => {
        return error.message;
      })
      return error(res, errorMessages, 400)
    }

    if (Number(endYear) < Number(startYear)) {
      return error(res, "EndYear must be greater than startYear", 400)
    }

    const workExperience = new WorkExperienceDetail();
    workExperience.company = company;
    workExperience.role = role;
    workExperience.startMonth = startMonth;
    workExperience.startYear = startYear;
    workExperience.endMonth = endMonth;
    workExperience.endYear = endYear;
    workExperience.description = description;
    workExperience.isEmployee = isEmployee;
    workExperience.user = userId;
    workExperience.section = sectionId;

    await workExperienceRepository.save(workExperience);
    return success(res,  workExperience, "Added Work Experience Successfully");
    
  } catch (err) {
    return error(res, (err as Error).message, 500)
  }
};

export const deleteWorkExperience: RequestHandler = async (req, res, next) => {
  try {
    // Convert the ID to a number
    const id = parseInt(req.params.id);

    // Find the existing work experience detail by ID
    const workExperienceToRemove = await workExperienceRepository.findOneBy({
      id: id,
    });

    // If the work experience detail doesn't exist, return a 404 Not Found
    if (!workExperienceToRemove) {
      return error(res, "Work Experience not found", 404);
    }

    // Delete the work experience detail
    const data = await workExperienceRepository.remove(workExperienceToRemove);

    success(res, data, "Work Experience Deleted");
  } catch (err) {
    console.log(err);
    error(res, (err as Error).message);
  }
};

export const workExperienceController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const workExperienceRepository =
      connectionSource.getRepository(WorkExperienceDetail);
    const workExperiences = await workExperienceRepository.find();
    res.json({ workExperiences });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateWorkExperience: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const workId = parseInt(req.params.workId);

  if (!workId) {
    res.statusCode = 400;
    return res.json({ message: "workExpId must be provided as a parameter" });
  }

  const {
    company,
    role,
    startMonth,
    startYear,
    endMonth,
    endYear,
    description,
    isEmployee,
    userId,
    sectionId,
  } = req.body;

  if (!userId) {
    res.statusCode = 400;
    return res.json({ message: "userId is missing from request body" });
  }

  if (sectionId === undefined) {
    res.statusCode = 400;
    return res.json({ message: "sectionId is missing from request body" });
  }

  if (!company || !role) {
    res.statusCode = 400;
    return res.json({
      message: "company or role is missing from request body",
    });
  }

  try {
    const workExperienceToUpdate = await workExperienceRepository.findOneBy({
      id: workId,
    });

    if (!workExperienceToUpdate) {
      res.statusCode = 404;
      return res.json({ message: "Work Experience not found" });
    }
    if (endYear && startYear && endYear < startYear) {
      res.statusCode = 400;
      return res.json({
        message: "EndYear must be greater than startYear"
      })
    }


    // Update the work experience details
    workExperienceToUpdate.company = company;
    workExperienceToUpdate.role = role;
    workExperienceToUpdate.startMonth = startMonth;
    workExperienceToUpdate.startYear = startYear;
    workExperienceToUpdate.endMonth = endMonth;
    workExperienceToUpdate.endYear = endYear;
    workExperienceToUpdate.description = description;
    workExperienceToUpdate.isEmployee = isEmployee;
    workExperienceToUpdate.user = userId;
    workExperienceToUpdate.section = sectionId;

    // Save the updated work experience
    await workExperienceRepository.save(workExperienceToUpdate);

    return res.json({
      message: "Updated Work Experience Successfully",
      data: workExperienceToUpdate,
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, message: (err as Error).message });
  }
};
