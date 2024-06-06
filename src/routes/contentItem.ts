import { Router } from 'express';

import {
  createContentItemRequest,
  deleteContentItemRequest,
  getContentItemsRequest,
  getContentItemRequest,
  updateContentItemRequest,
} from '../controllers/contentItem.controller';

import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getContentItemsRequest);

router.get('/:contentItemID', getContentItemRequest);

router.post('/', authenticate(['ADMIN']), createContentItemRequest);

router.put(
  '/:contentItemID',
  authenticate(['ADMIN']),
  updateContentItemRequest
);

router.delete(
  '/:contentItemID',
  authenticate(['ADMIN']),
  deleteContentItemRequest
);

export { router };
