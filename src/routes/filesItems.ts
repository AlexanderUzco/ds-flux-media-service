import { Router } from 'express';

import { createFilesItemRequest } from '../controllers/filesItem.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate(['ADMIN', 'WRITER']), createFilesItemRequest);

export { router };
