import { Router } from 'express';
import {
  createCard, getCards, deleteCard, likeCard, dislikeCard, validateCreateCard,
} from '../controllers/cards';

const router = Router();

router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.post('/', validateCreateCard, createCard);
router.get('/', getCards);

export default router;
