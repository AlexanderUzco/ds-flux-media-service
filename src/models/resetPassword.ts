import { Schema, model, Types, Model } from 'mongoose';
import crypto from 'crypto';
import { ResetPassword } from '../interfaces/resetPassword.interface';

const ResetPasswordSchema = new Schema<ResetPassword>(
  {
    userID: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    resetToken: { type: String, required: true },
    expiresAt: { type: Date, required: true, expires: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ResetPasswordSchema.methods.generateResetToken = function () {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString('hex');
  this.resetToken = token;
  this.expiresAt = new Date(Date.now() + 3600000); // Token válido por 1 hora
  return token;
};

const ResetPasswordModel = model<ResetPassword>(
  'resetPassword',
  ResetPasswordSchema
);

export default ResetPasswordModel;
