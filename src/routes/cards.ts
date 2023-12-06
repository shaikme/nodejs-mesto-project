import { Router } from 'express';
import {
  createCard, getCards, deleteCard, likeCard, dislikeCard, validateCreateCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

export default router;
