import { Request, Response } from 'express';
import { handleErrorHttp } from '../utils/errors';
import {
  checkExistUser,
  findUserByUsername,
  signupUserBase,
  verifyAuthenticatedUser,
} from '../services/users.service';
import { clearToken, generateToken } from '../utils/auth';

const signupUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const responseSignUser = await signupUserBase(body);

    if (!responseSignUser) throw new Error('Error creating user');

    const { id, username, email } = responseSignUser;

    const token = generateToken(res, id);

    res.status(201).json({ id, username, email, token });
  } catch (error) {
    handleErrorHttp(res, 'Error signin user', error);
  }
};

const signinUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const responseExistUser = await checkExistUser(body);

    const { id, email, username, role } = responseExistUser;

    const token = generateToken(res, id);

    res.status(201).json({ id, email, username, role, token });
  } catch (error) {
    const errorMessage =
      (error instanceof Error && error.message) || 'Error signup user';
    handleErrorHttp(res, errorMessage);
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

    res.status(200).json({
      id: userData.id,
      email: userData.email,
      username: userData.username,
      role: userData.role,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error authenticateUser user');
  }
};

const verifyUniqueUsernameRequest = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const user = await findUserByUsername(username);

    if (user) {
      res
        .status(200)
        .json({ message: 'Username already exists', exists: true });
    } else {
      res.status(200).json({ message: 'Username available', exists: false });
    }
  } catch (error) {
    handleErrorHttp(res, 'Error verifyUniqueUsernameRequest', error);
  }
};

export {
  signupUser,
  signinUser,
  signoutUser,
  authenticateUser,
  verifyUniqueUsernameRequest,
};
