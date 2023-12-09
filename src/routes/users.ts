import { Router } from 'express';
import {
  getUser, getUsers, updateUser, getСurrentUser,
  updateUserAvatar, validateUpdateUser, validateUpdateUserAvatar,
} from '../controllers/users';

const router = Router();

router.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);
router.get('/me', getСurrentUser);
router.patch('/me', validateUpdateUser, updateUser);
router.get('/:id', getUser);
router.get('/', getUsers);

export default router;
