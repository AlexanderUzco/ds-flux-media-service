import { Document, Schema } from 'mongoose';

export interface FilesItem extends Document {
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  createdBy: Schema.Types.ObjectId;
}
