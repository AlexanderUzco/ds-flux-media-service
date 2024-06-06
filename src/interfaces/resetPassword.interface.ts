import { Document, Schema } from 'mongoose';

export interface ResetPassword extends Document {
  userID: Schema.Types.ObjectId;
  resetToken: string;
  expiresAt: Date;
  generateResetToken: () => Promise<string>;
}
