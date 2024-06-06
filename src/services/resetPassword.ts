import bcrypt from 'bcryptjs';
import { ResetPassword } from '../interfaces/resetPassword.interface';
import ResetPasswordModel from '../models/resetPassword';
import UserModel from '../models/users';
import { SALT_ROUNDS_PASSWORD } from '../enviroments/app.enviroment';
import { findUserByEmail } from './users.service';

const createResetPassword = async (email: string) => {
  const userData = await findUserByEmail(email);

  if (!userData) {
    throw new Error('User not found');
  }

  const existingResetPassword = await ResetPasswordModel.findOne({
    userID: userData.id,
  });

  if (existingResetPassword) {
    await ResetPasswordModel.findByIdAndDelete(existingResetPassword._id);
  }

  const resetPasswordDoc = new ResetPasswordModel({ userID: userData.id });

  const token = await resetPasswordDoc.generateResetToken();

  await resetPasswordDoc.save();

  return token;
};

const verifyResetPassword = async (token: string, newPassword: string) => {
  const resetPasswordDoc = await ResetPasswordModel.findOne({
    resetToken: token,
  });

  if (!resetPasswordDoc || resetPasswordDoc.expiresAt < new Date()) {
    throw new Error('Invalid reset token.');
  }

  const user = await UserModel.findById(resetPasswordDoc.userID);

  if (!user) {
    throw new Error('User not found.');
  }

  user.password = newPassword;

  await user.save();

  await ResetPasswordModel.findByIdAndDelete(resetPasswordDoc._id);

  return {
    userID: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

export { createResetPassword, verifyResetPassword };
