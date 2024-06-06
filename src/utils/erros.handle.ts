import { Response } from 'express';

const handleErrorHttp = (res: Response, error: string) => {
  res.status(500);
  res.send({
    error,
  });
};

export { handleErrorHttp };
