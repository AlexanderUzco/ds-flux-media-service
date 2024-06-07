import { User } from '../interfaces/user.interface';
import UserModel from '../models/users.model';

const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const signinUserBase = async (user: User) => {
  const { email, password, username, role } = user;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  if (role === 'ADMIN') {
    throw new Error('User not allowed to create admin users');
  }

  const userData = await UserModel.create({
    username,
    email,
    password,
    role,
  });

  return userData;
};

const checkExistUser = async (user: User) => {
  const { email, password } = user;

  const userExists = await UserModel.findOne({ email });

  if (!userExists) {
    throw new Error('User not found');
  }

  if (!(await userExists.comparePassword(password)))
    throw new Error('Data incorrect, please verify');

  return userExists;
};

const verifyAuthenticatedUser = async (userID: string | undefined) => {
  if (!userID) {
    throw new Error('UserID not found');
  }

  const userData = await UserModel.findById(userID, 'username email role');

  if (!userData) {
    throw new Error('User not found');
  }

  return userData;
};

export {
  signinUserBase,
  checkExistUser,
  verifyAuthenticatedUser,
  findUserByEmail,
};
