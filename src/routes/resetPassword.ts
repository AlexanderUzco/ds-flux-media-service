import { Router } from 'express';
import {
  createNewPassword,
  requestResetPassword,
} from '../controllers/resetPassword';

const router = Router();

router.post('/send-request', requestResetPassword);

router.post('/change-passowrd', createNewPassword);

export { router };
