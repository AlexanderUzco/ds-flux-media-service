import { Router } from 'express';

import {
  createFilesItemRequest,
  createFilesItemsRequest,
} from '../controllers/filesItem.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate(['ADMIN', 'WRITER']), createFilesItemRequest);
router.post(
  '/create-files',
  authenticate(['ADMIN', 'WRITER']),
  createFilesItemsRequest
);

export { router };
