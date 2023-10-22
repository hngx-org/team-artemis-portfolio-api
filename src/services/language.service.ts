import { Response } from 'express';

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

export const programmingLanguages = [
	'JavaScript',
	'TypeScript',
	'Python',
	'Java',
	'C',
	'C++',
	'C#',
	'Go',
	'Rust',
	'Swift',
	'Kotlin',
	'Ruby',
	'PHP',
	'Scala',
	'Elixir',
	'Clojure',
	'Haskell',
	'Lua',
	'Dart',
	'R',
	'Julia',
	'Groovy',
	'Objective-C',
	'CoffeeScript',
	'F#',
	'Perl',
	'MATLAB',
	'VB.NET',
	'Shell Scripting',
  ];

export default {
  success,
  badRequest,
  serverError,
  created,
  notFound
};
