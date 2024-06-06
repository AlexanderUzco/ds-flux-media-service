import { Response } from 'express';

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

const handleErrorHttp = (
  res: Response,
  errorMessage: string,
  errorRaw?: any
) => {
  res.status(500);

  if (errorRaw.name && errorRaw.name == 'ValidationError') {
    res.status(400).send({
      message: 'Validation Error',
      errors: formatMongooseValidationError(errorRaw),
    });
  } else {
    res.status(500).send({
      message: errorMessage,
      error: {
        message: errorRaw.message,
        name: errorRaw.name,
        stack: errorRaw.stack,
      },
    });
  }
};

export { handleErrorHttp };
