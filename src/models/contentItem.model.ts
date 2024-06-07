import { Schema, model } from 'mongoose';
import { ContentItem } from '../interfaces/contentItem.interface';

const ContentItemSchema = new Schema<ContentItem>(
  {
    title: { type: String, required: true },
    topicID: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    content: {
      text: { type: String },
      videos: [{ type: String }],
      images: [{ type: Schema.Types.ObjectId, ref: 'FilesItem' }],
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    views: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ContentItemModel = model<ContentItem>('ContentItem', ContentItemSchema);

export default ContentItemModel;
