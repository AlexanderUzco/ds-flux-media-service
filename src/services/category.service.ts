import { Category } from '../interfaces/category.interface';
import CategoryModel from '../models/category.model';
import { deleteTopicsByCategory } from './topic.service';

const getCategories = async () => {
  const categories = await CategoryModel.find().populate('createdBy');

  return categories;
};

const getCategory = async (id: string) => {
  const category = await CategoryModel.findById(id).populate('createdBy');

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};

const createCategory = async (category: Category) => {
  const { name, imageUrl, description, createdBy, ref } = category;

  const categoryExists = await CategoryModel.findOne({ name });

  if (categoryExists) {
    throw new Error('Category already exists');
  }

  const categoryData = await CategoryModel.create({
    name,
    imageUrl,
    description,
    ref,
    createdBy,
  });

  return categoryData;
};

const updateCategory = async (category: Category) => {
  const { id, name, imageUrl, description, ref } = category;

  const categoryExists = await CategoryModel.findById(id);

  if (!categoryExists) {
    throw new Error('Category not found');
  }

  categoryExists.name = name;
  categoryExists.imageUrl = imageUrl;
  categoryExists.description = description;
  categoryExists.ref = ref;

  await categoryExists.save();

  return categoryExists;
};

const deleteCategory = async (id: string) => {
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    throw new Error('Category not found');
  }

  // Delete all content items associated with the category

  // Topics
  // Delete all topics associated with the category

  //await deleteTopicsByCategory(id);

  return category;
};

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
