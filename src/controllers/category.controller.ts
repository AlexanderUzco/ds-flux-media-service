import { Request, Response } from 'express';
import { handleErrorHttp } from '../utils/errors';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../services/category.service';

const getCategoryRequest = async (req: Request, res: Response) => {
  try {
    const { categoryID } = req.params;

    const category = await getCategory(categoryID);

    if (!category) throw new Error('Category not found');

    res.status(200).send({
      message: 'Category found',
      category,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error getting category', error);
  }
};

const getCategoriesRequest = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();

    if (!categories) throw new Error('Error getting categories');

    res.status(200).send({
      message: 'Categories found',
      categories,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error getting categories', error);
  }
};

const createCategoryRequest = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newCategory = await createCategory(body);

    if (!newCategory) throw new Error('Error creating category');

    res.status(201).send({
      message: 'Category created',
      category: newCategory,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error creating category', error);
  }
};

const updateCategoryRequest = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { categoryID } = req.params;

    const updatedCategory = await updateCategory({ ...body, id: categoryID });

    if (!updatedCategory) throw new Error('Error updating category');

    res.status(200).send({
      message: 'Category updated',
      category: updatedCategory,
    });
  } catch (error) {
    handleErrorHttp(res, 'Error updating category', error);
  }
};

const deleteCategoryRequest = async (req: Request, res: Response) => {
  try {
    const { categoryID } = req.params;
    const category = await deleteCategory(categoryID);

    if (!category) throw new Error('Error deleting category');

    res.status(200).send({
      message: 'Category deleted',
    });
  } catch (error) {
    handleErrorHttp(res, 'Error deleting category', error);
  }
};

export {
  getCategoryRequest,
  getCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
};
