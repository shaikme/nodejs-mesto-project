import { Router } from 'express';
import cardRouter from './cards';
import userRouter from './users';

const router = Router();

router.use('/cards', cardRouter);
router.use('/users', userRouter);

export default router;
