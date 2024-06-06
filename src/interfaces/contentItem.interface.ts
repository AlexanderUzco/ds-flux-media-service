import { Document, Schema } from 'mongoose';

export interface Content {
  text: string;
  videos: Schema.Types.ObjectId[];
  images: Schema.Types.ObjectId[];
  documents: Schema.Types.ObjectId[];
}

export interface ContentItem extends Document {
  title: string;
  description: string;
  topicID: Schema.Types.ObjectId;
  content: Content;
  createdBy: Schema.Types.ObjectId;
  views: Schema.Types.ObjectId[];
}
