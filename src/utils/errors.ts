import { Response } from 'express';
import { Error as MoongoseError } from 'mongoose';

// Helper function to format Mongoose validation errors
const formatMongooseValidationError = (error: any) => {
  const errors = error.errors;
  const formattedErrors: { [key: string]: string } = {};

  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      formattedErrors[key] = errors[key].message;
    }
  }

  return formattedErrors;
};

const handleErrorHttp = (res: Response, message: string, errorRaw?: any) => {
  if (!errorRaw) {
    res.status(500).send({
      message: message,
    });
  }

  if (errorRaw instanceof MoongoseError) {
    return res.status(400).send({
      message: errorRaw.name,
      errors: formatMongooseValidationError(errorRaw),
    });
  }

  if (errorRaw instanceof Error) {
    res.status(500).send({
      message: errorRaw.message,
    });
  }

  res.status(500).send({
    message: message,
  });
};

export { handleErrorHttp };
