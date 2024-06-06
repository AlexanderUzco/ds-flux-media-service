import { Request, Response } from 'express';
import { handleErrorHttp } from '../utils/erros.handle';

const getUser = async (req: Request, res: Response) => {};

const getUsers = async (req: Request, res: Response) => {};

const signinUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    res.send({
      message: 'User signin successfully',
      data: body,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error getting user');
  }
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    res.send({
      message: 'User signup successfully',
      data: body,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error getting user');
  }
};

const updateUser = async (req: Request, res: Response) => {};

const deleteUser = async (req: Request, res: Response) => {};

export { getUser, getUsers, signupUser, signinUser, updateUser, deleteUser };
