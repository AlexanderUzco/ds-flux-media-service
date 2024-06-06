import { Schema, Document } from 'mongoose';

export interface AllowContent {
  text: boolean;
  image: boolean;
  document: boolean;
  video: boolean;
}

export interface Topic extends Document {
  id: Schema.Types.ObjectId;
  name: string;
  color: string;
  categoryID: Schema.Types.ObjectId;
  allowContent: AllowContent;
  createdBy: Schema.Types.ObjectId;
}
