import { Schema, model, Types } from 'mongoose';
import {
  ContentItem,
  Content,
  ImageContentData,
} from '../interfaces/contentItem.interface';

const ContentItemSchema = new Schema<ContentItem>(
  {
    title: { type: String, required: true },
    topicID: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    content: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (value: Content) {
          if (value.type === 'text') {
            return typeof value.data === 'string';
          }

          if (value.type === 'image') {
            return (
              Array.isArray(value.data) &&
              value.data.every(
                (item: ImageContentData) =>
                  typeof item === 'object' &&
                  typeof item.url === 'string' &&
                  typeof item.ref === 'string'
              )
            );
          }

          if (value.type === 'video') {
            return (
              Array.isArray(value.data) &&
              value.data.every((item: any) => typeof item === 'string')
            );
          }

          return false;
        },
        message: (props) => `Invalid content data for type ${props.value.type}`,
      },
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
