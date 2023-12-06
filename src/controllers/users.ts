import { Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';
import User from '../models/user';
import NotFoundError from '../errors';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.status(200).send(users);
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new NotFoundError('Нет пользователя с таким id'));
    return;
  }

  res.status(200).send(user);
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
    res.status(201).send(newUser);
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
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });

    if (!user) {
      next(new NotFoundError('Нет пользователя с таким id'));
      return;
    }

    res.status(200).send(user);
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
    }, { new: true });

    if (!user) {
      next(new NotFoundError('Нет пользователя с таким id'));
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
