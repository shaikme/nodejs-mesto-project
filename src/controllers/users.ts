import { Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';
import { constants } from 'http2';
import User from '../models/user';
import NotFoundError from '../errors';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.status(constants.HTTP_STATUS_OK).send(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).orFail(() => new NotFoundError('Нет пользователя с таким id'));

  res.status(constants.HTTP_STATUS_OK).send(user);
};

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await User.create(req.body);
    res.status(constants.HTTP_STATUS_CREATED).send(newUser);
  } catch (error) {
    next(error);
  }
};

export const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(200),
  }),
});

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    }).orFail(() => new NotFoundError('Нет пользователя с таким id'));

    res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (error) {
    next(error);
  }
};

export const validateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, {
      new: true,
      runValidators: true,
    }).orFail(() => new NotFoundError('Нет пользователя с таким id'));

    res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (error) {
    next(error);
  }
};
