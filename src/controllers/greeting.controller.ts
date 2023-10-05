import express, { Request, RequestHandler, Response } from "express";
import { sayHelloService } from "../services/greeting.service";
import { error, success } from "../utils";

export const sayHelloController: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await sayHelloService();
    success(res, data, "Greeted");
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};
