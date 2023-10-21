import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { error } from "../utils";

export const authMiddleWare = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) return error(res, "no token", 400);
  let response = await validateUser(
    req.headers.authorization,
    req.headers?.action
  );

  if (!response.authorized) {
    return error(res, "not authorized", 400);
  }

  req.user = response.user;

  next();
  return;
};

export const validateUser = async (authHeader: any, permission: any) => {
  try {
    let token: any;

    if (authHeader) {
      token = authHeader.split(" ")[1];
    }

    let data: any = { token };

    if (permission) {
      data = { ...data, permission };
    }

    const responseData = await axios.post(
      `https://auth.akuya.tech/api/authorize`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("test", responseData);

    return responseData.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const validate = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return error(res, "no token", 400);
    const response = await axios.get(
      `https://staging.zuri.team/api/auth/api/auth/revalidate-login/${token}`
    );
    if (response.status !== 200) return error(res, "invalid token", 500);
    req.user = response.data.data.user;
    next();
  } catch (error) {
    next(error);
    console.log(error);
    return error(res, "An error occurred", 500);
  }
};
