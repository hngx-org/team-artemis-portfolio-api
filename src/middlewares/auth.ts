import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { error } from "../utils";

export const authMiddleWare = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // const authorizationHeader = req.headers.authorization;

  // console.log(authorizationHeader);

  // let token: string;
  // if (authorizationHeader) {
  //   token = authorizationHeader.split(" ")[1];
  // }

  // token =
  //   token || req.body.token || req.query.token || req.headers["x-access-token"];

  let response = await validateUser(
    req.headers.authorization,
    req.headers?.action
  );
  console.log("response", response);

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

    return (
      responseData.data || {
        authorized: true,
        user: {
          id: "67762b0e-c756-47a4-a965-9f62f82a7d33",
        },
      }
    );
  } catch (error) {
    throw new Error();
  }
};
