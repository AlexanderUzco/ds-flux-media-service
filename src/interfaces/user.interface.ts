import { Document } from 'mongoose';

export type Role = 'ADMIN' | 'READER' | 'WRITER';

export interface UserBasicInfo {
  userID: string;
  username: string;
  email: string;
  role: Role;
}

export interface User extends UserBasicInfo, Document {
  id: string;
  password: string;
  comparePassword: (enteredPassword: string) => boolean;
}
