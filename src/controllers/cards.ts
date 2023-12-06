import { Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';
import { constants } from 'http2';
import Card from '../models/card';
import NotFoundError from '../errors';

export const getCards = async (req: Request, res: Response) => {
  const cards = await Card.find({});
  res.status(constants.HTTP_STATUS_OK).send(cards);
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCard = await Card.create({ ...req.body, ownerId: req.user._id });
    res.status(constants.HTTP_STATUS_CREATED).send(newCard);
  } catch (error) {
    next(error);
  }
};

export const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Card.deleteOne({ _id: req.params.cardId });

    res.status(constants.HTTP_STATUS_NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Нет карточки с таким id'));

    res.status(constants.HTTP_STATUS_OK).send(card);
  } catch (error) {
    next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Нет карточки с таким id'));

    res.status(constants.HTTP_STATUS_OK).send(card);
  } catch (error) {
    next(error);
  }
};
