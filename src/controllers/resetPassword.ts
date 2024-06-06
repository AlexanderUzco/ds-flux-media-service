import { Request, Response } from 'express';
import { handleErrorHttp } from '../utils/errors';
import {
  createResetPassword,
  verifyResetPassword,
} from '../services/resetPassword';
import { getBaseUrl } from '../utils/common';
import sendResetPassowrdEmail from '../utils/email/resetPasswordEmail';

const requestResetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const token = await createResetPassword(email);

    // TODO: Send email with resetToken

    await sendResetPassowrdEmail({
      to: email,
      url: `${getBaseUrl(req)}/reset-password?token=${token}`,
    });

    res
      .status(200)
      .json({ message: 'Email sent with reset instructions', token });
  } catch (error) {
    handleErrorHttp(res, 'Error request ResetPassword', error);
  }
};

const createNewPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const user = await verifyResetPassword(token, newPassword);

    res.status(200).json({ message: 'Password updated', user });
  } catch (error) {
    handleErrorHttp(res, 'Error create New Password', error);
  }
};

export { requestResetPassword, createNewPassword };
