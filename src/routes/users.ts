import { Router } from 'express';
import { validateUpdateUser, validateUpdateUserAvatar, validateGetUser } from '../middlewares/validators';
import {
  getUser, getUsers, updateUser, getСurrentUser, updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);
router.get('/me', getСurrentUser);
router.patch('/me', validateUpdateUser, updateUser);
router.get('/:id', validateGetUser, getUser);
router.get('/', getUsers);

export default router;
