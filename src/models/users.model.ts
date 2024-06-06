import { Schema, model, Types, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';
import { SALT_ROUNDS_PASSWORD } from '../enviroments/app.enviroment';

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'READER', 'WRITER'],
      default: 'READER',
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS_PASSWORD);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = model('User', UserSchema);

export default UserModel;
