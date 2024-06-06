import { Router } from 'express';

import {
  createTopicRequest,
  deleteTopicRequest,
  getTopicsRequest,
  getTopicRequest,
  updateTopicRequest,
} from '../controllers/topic.controller';

import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getTopicsRequest);
router.get('/:topicID', getTopicRequest);

router.post('/', authenticate(['ADMIN']), createTopicRequest);
router.put('/:topicID', authenticate(['ADMIN']), updateTopicRequest);

router.delete('/:topicID', authenticate(['ADMIN']), deleteTopicRequest);

export { router };
