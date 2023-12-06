import { Router } from 'express';
import {
  createUser, getUser, getUsers, updateUser,
  updateUserAvatar, validateCreateUser, validateUpdateUser, validateUpdateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', validateCreateUser, createUser);
router.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);
router.patch('/me', validateUpdateUser, updateUser);

export default router;
