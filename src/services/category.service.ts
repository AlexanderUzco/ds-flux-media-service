import { Category } from '../interfaces/category.interface';
import CategoryModel from '../models/category.model';

const getCategories = async () => {
  const categories = await CategoryModel.find();

  return categories;
};

const getCategory = async (id: string) => {
  const category = await CategoryModel.findById(id);

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};

const createCategory = async (category: Category) => {
  const { name, imageUrl, description, createdBy } = category;

  const categoryExists = await CategoryModel.findOne({ name });

  if (categoryExists) {
    throw new Error('Category already exists');
  }

  const categoryData = await CategoryModel.create({
    name,
    imageUrl,
    description,
    createdBy,
  });

  return categoryData;
};

const updateCategory = async (category: Category) => {
  const { id, name, imageUrl, description } = category;

  const categoryExists = await CategoryModel.findById(id);

  if (!categoryExists) {
    throw new Error('Category not found');
  }

  categoryExists.name = name;
  categoryExists.imageUrl = imageUrl;
  categoryExists.description = description;

  await categoryExists.save();

  return categoryExists;
};

const deleteCategory = async (id: string) => {
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
