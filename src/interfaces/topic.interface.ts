import { Schema, Document } from 'mongoose';

export type TopicAllowContent = 'text' | 'image' | 'video';

export interface AllowContent {
  text: boolean;
  image: boolean;
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
