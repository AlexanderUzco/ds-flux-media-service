import { Schema, model, Types, Model } from 'mongoose';
import { Topic } from '../interfaces/topic.interface';

const AllowContentSchema = new Schema(
  {
    text: { type: Boolean, required: true },
    image: { type: Boolean, required: true },
    video: { type: Boolean, required: true },
  },
  { _id: false }
);

const TopicSchema = new Schema<Topic>(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    allowContent: { type: AllowContentSchema, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const TopicModel = model<Topic>('Topic', TopicSchema);

export default TopicModel;
