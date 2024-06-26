import { Document, Schema } from 'mongoose';

export interface Category extends Document {
  id: Schema.Types.ObjectId;
  name: string;
  imageUrl: string;
  ref: string;
  description: string;
  createdBy: Schema.Types.ObjectId;
}
