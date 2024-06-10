import { Router } from 'express';

import {
  createContentItemRequest,
  deleteContentItemRequest,
  getContentItemsRequest,
  getContentItemRequest,
  updateContentItemRequest,
  getContentItemByUserIDRequest,
  getTotalItemsSummaryRequest,
} from '../controllers/contentItem.controller';

import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getContentItemsRequest);

router.get('/total-items-summary', getTotalItemsSummaryRequest);

router.get('/:contentItemID', getContentItemRequest);

router.get(
  '/get-by-user/:userID',
  authenticate(['ADMIN', 'WRITER']),
  getContentItemByUserIDRequest
);

router.post('/', authenticate(['ADMIN', 'WRITER']), createContentItemRequest);

router.put(
  '/:contentItemID',
  authenticate(['ADMIN', 'WRITER']),
  updateContentItemRequest
);

router.delete(
  '/:contentItemID',
  authenticate(['ADMIN', 'WRITER']),
  deleteContentItemRequest
);

export { router };
