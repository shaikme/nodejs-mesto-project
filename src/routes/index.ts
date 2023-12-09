import { Router } from 'express';
import cardRouter from './cards';
import userRouter from './users';
import {
  createUser, validateCreateUser, login, validateLoginUser,
} from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.post('/signin', validateLoginUser, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/cards', cardRouter);
router.use('/users', userRouter);

export default router;
