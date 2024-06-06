import { Router } from 'express';
import {
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoriesRequest,
  getCategoryRequest,
  updateCategoryRequest,
} from '../controllers/category.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getCategoriesRequest);
router.get('/:categoryID', getCategoryRequest);

router.post('/', authenticate(['ADMIN']), createCategoryRequest);
router.put('/:categoryID', authenticate(['ADMIN']), updateCategoryRequest);

router.delete('/:categoryID', authenticate(['ADMIN']), deleteCategoryRequest);

export { router };
