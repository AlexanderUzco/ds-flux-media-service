import { Request, Response } from 'express';
import { handleErrorHttp } from '../utils/erros.handle';
import {
  checkExistUser,
  signinUserBase,
  verifyAuthenticatedUser,
} from '../services/users.service';
import { clearToken, generateToken } from '../utils/auth';
import UserModel from '../models/users';

const signinUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const responseSignUser = await signinUserBase(body);

    if (!responseSignUser) throw new Error('Error creating user');

    const { id, username, email } = responseSignUser;

    generateToken(res, id);

    res.status(201).json({ id, username, email });
  } catch (error) {
    handleErrorHttp(res, 'Error signin user', error);
  }
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const responseExistUser = await checkExistUser(body);

    if (!responseExistUser) throw new Error('User dont exist');

    const { id, email, username, role } = responseExistUser;

    generateToken(res, id);

    res.status(201).json({ id, email, username, role });
  } catch (error) {
    handleErrorHttp(res, 'Error getting user');
  }
};

const signoutUser = (req: Request, res: Response) => {
  try {
    clearToken(res);
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    handleErrorHttp(res, 'Error signoutUser user');
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  try {
    const userData = await verifyAuthenticatedUser(req.user?.userID);

    if (!userData) throw new Error('User not found');

    res.status(200).json(userData);
  } catch (error) {
    handleErrorHttp(res, 'Error authenticateUser user');
  }
};

export { signupUser, signinUser, signoutUser, authenticateUser };
