import { Document, Schema } from 'mongoose';
import { TopicAllowContent } from './topic.interface';

interface BaseContent {
  type: TopicAllowContent;
}

export interface ImageContentData {
  url: string;
  ref: string;
}

interface TextContent extends BaseContent {
  type: 'text';
  data: string;
}

interface ImageContent extends BaseContent {
  type: 'image';
  data: ImageContentData[];
}

interface VideoContent extends BaseContent {
  type: 'video';
  data: string[];
}

export type Content = TextContent | ImageContent | VideoContent;

export interface ContentItem extends Document {
  title: string;
  topicID: Schema.Types.ObjectId;
  content: Content;
  createdBy: Schema.Types.ObjectId;
  views: Schema.Types.ObjectId[];
}
