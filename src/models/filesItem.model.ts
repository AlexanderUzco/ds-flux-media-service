import { Schema, model } from 'mongoose';
import { FilesItem } from '../interfaces/filesItem.interface';

const FilesItemSchema = new Schema<FilesItem>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['image', 'document', 'video'],
      required: true,
    },
    url: { type: String, required: true },
    ref: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FilesItemModel = model<FilesItem>('FilesItem', FilesItemSchema);

export default FilesItemModel;
