import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { AuthenticationError } from './error.middleware';
import UserModel from '../models/users.model';
import { Role } from '../interfaces/user.interface';

const authenticate = (roles?: Role[]) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.cookies.jwt;

      if (!token) {
        throw new AuthenticationError('Token not found');
      }

      const jwtSecret = process.env.JWT_SECRET || '';
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      if (!decoded || !decoded.userId) {
        throw new AuthenticationError('UserId not found');
      }

      const user = await UserModel.findById(
        decoded.userId,
        '_id username email role'
      );

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      if (user.role !== 'ADMIN' && roles) {
        if (!roles.includes(user.role)) {
          throw new AuthenticationError('Unauthorized: Role not allowed');
        }
      }

      req.user = {
        userID: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      next();
    } catch (e: any) {
      throw new AuthenticationError(e.message || 'Unauthorized');
    }
  });

export { authenticate };
