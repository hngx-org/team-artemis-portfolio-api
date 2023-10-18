import { Response } from 'express';
import axios from 'axios';

export const success = (res: Response, data: string | Object) => {
  return res.status(200).json({
    status: 200,
    message: 'success',
    data: data,
  });
};

export const created = (res: Response, data: string | Object) => {
  return res.status(201).json({
    status: 201,
    message: 'Resource created',
    data: data,
  });
};

export const badRequest = (res: Response, data: string | Object) => {
  return res.status(400).json({
    status: 400,
    error: 'Bad Request',
    message: data,
    data: null,
  });
};

export const serverError = (res: Response, data: string | Object) => {
  return res.status(500).json({
    status: 500,
    error: 'Internal server error',
    message: data,
    data: null,
  });
};

export const notFound = (res: Response, data: string | Object) => {
  return res.status(404).json({
    status: 404,
    error: 'Resource not found',
    message: data,
    data: null,
  });
};

export const getAllLanguages = async (userId) => {
  const hostUrl = 'https://hng-u6fu.vercel.app';
  const languages = await axios.get(`${hostUrl}/getLanguages/${userId}`);
  if (!languages.data.data) return []
  return languages.data.data
};

export default {
  success,
  badRequest,
  serverError,
  created,
  notFound,
  getAllLanguages,
};
