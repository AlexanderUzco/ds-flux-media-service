import { Router } from 'express';
import { signinUser } from '../controllers/user';

const router = Router();

router.post('/signin', signinUser);

router.post('/signup');

export { router };
