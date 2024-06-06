import { Router } from 'express';
import {
  authenticateUser,
  signinUser,
  signoutUser,
  signupUser,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signin', signinUser);

router.post('/signup', signupUser);

router.post('/signout', signoutUser);

router.get('/authenticate', authenticate(), authenticateUser);

export { router };
