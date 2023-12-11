import { Router } from 'express';
import { validateCreateCard, validateGetCard } from '../middlewares/validators';
import {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';

const router = Router();

router.delete('/:cardId', validateGetCard, deleteCard);
router.put('/:cardId/likes', validateGetCard, likeCard);
router.delete('/:cardId/likes', validateGetCard, dislikeCard);
router.post('/', validateCreateCard, createCard);
router.get('/', getCards);

export default router;
