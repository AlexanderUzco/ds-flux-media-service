import { Schema, model, Types, Model } from 'mongoose';
import { Category } from '../interfaces/category.interface';

const CategorySchema = new Schema<Category>(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    ref: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CategoryModel = model('Category', CategorySchema);

export default CategoryModel;
