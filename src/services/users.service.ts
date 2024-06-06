import { User, UserBasicInfo } from '../interfaces/user.interface';
import UserModel from '../models/users';

const signinUserBase = async (user: User) => {
  const { email, password, username } = user;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const userData = await UserModel.create({
    username,
    email,
    password,
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

export { signinUserBase, checkExistUser, verifyAuthenticatedUser };
