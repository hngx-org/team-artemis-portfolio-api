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
    this.name = this.constructor.name;
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
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("An error occurred:", err);

  if (res.headersSent) {
    return next(err);
  }
  res.setHeader("Content-Type", "application/json");

  if (err instanceof SyntaxError) {
    res.status(400).json({ message: err.message });
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
    res.status(err.statusCode).json({ message: err.message });
  }
  res.status(err.statusCode || 500).json({ message: err.message });

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
