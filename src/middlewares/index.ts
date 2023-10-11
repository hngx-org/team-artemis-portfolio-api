import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  statusCode: number; // Define the statusCode property

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

class MethodNotAllowedError extends CustomError {
  constructor(message: string) {
    super(message, 405);
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("An error occurred:", err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof BadRequestError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ForbiddenError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof InternalServerError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof MethodNotAllowedError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof CustomError) {
    // Check if the error is an instance of CustomError
    res.status(err.statusCode).json({ message: err.message });
  }
};

export {
  errorHandler,
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
};
