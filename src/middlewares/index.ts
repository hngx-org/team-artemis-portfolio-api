import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  statusCode: number;

  constructor(name: string, message: string, statusCode?: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

function createCustomError(name: string, statusCode: number = 500) {
  return class extends CustomError {
    constructor(message: string) {
      super(name, message, statusCode);
    }
  };
}

const NotFoundError = createCustomError("NotFound Error", 404);
const BadRequestError = createCustomError("BadRequest Error", 400);
const UnauthorizedError = createCustomError("Unauthorized Error", 401);
const ForbiddenError = createCustomError("Forbidden Error", 403);
const InternalServerError = createCustomError("Internal ServerError", 500);
const MethodNotAllowedError = createCustomError("MethodNotAllowed Error", 405);
const ConflictError = createCustomError("Conflict Error", 409);
const UnprocessableEntityError = createCustomError(
  "Unprocessable Entity Error",
  422
);

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("An error occurred:", err);

  if (res.headersSent) {
    return next(err);
  }

  const errorResponse = {
    timestamp: new Date().toISOString(),
    status: err.statusCode || 500,
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong",
    path: req.path,
    success: false,
  };

  res.status(errorResponse.status).json(errorResponse);
};

export {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  UnprocessableEntityError,
  ConflictError,
  errorHandler,
};
