import { Document, Schema } from 'mongoose';

export interface FilesItem extends Document {
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  ref: string;
  createdBy: Schema.Types.ObjectId;
}
