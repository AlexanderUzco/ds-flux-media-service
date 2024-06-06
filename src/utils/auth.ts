import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../enviroments/app.enviroment';
import { NextFunction, Request, Response } from 'express';

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof AuthenticationError) {
    res.status(401).json({ message: 'Unauthorized: ' + err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const generateToken = (res: Response, userId: string) => {
  if (!JWT_SECRET) throw new Error('Error in generateToken');

  const jwtSecret = JWT_SECRET;

  const token = jwt.sign({ userId }, jwtSecret, {
    // expiresIn: 1 year
    expiresIn: 60 * 60 * 24 * 365,
  });

  console.log('token', token);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });
};

const clearToken = (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
};

export { generateToken, clearToken };
