import {
  Router, Request, Response, NextFunction,
} from 'express';
import cardRouter from './cards';
import userRouter from './users';
import { validateLoginUser, validateCreateUser } from '../middlewares/validators';
import { createUser, login } from '../controllers/users';
import auth from '../middlewares/auth';
import { NotFoundError } from '../errors';

const router = Router();

router.post('/signin', validateLoginUser, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/cards', cardRouter);
router.use('/users', userRouter);

router.use('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Эндпойнт не найден'));
});

export default router;
