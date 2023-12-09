import { Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';
import { constants } from 'http2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { NotFoundError, UnauthorizedError, ConflictError } from '../errors';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.status(constants.HTTP_STATUS_OK).send(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).orFail(() => new NotFoundError('Нет пользователя с таким id'));

  res.status(constants.HTTP_STATUS_OK).send(user);
};

export const getСurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id).orFail(() => new NotFoundError('Нет пользователя с таким id'));

  res.status(constants.HTTP_STATUS_OK).send(user);
};

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(200),
  }),
});

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email, password, name, avatar, about,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      name,
      avatar,
      about,
      password: passwordHash,
    });

    res.status(constants.HTTP_STATUS_CREATED).send(newUser);
  } catch (error: any) {
    if (error.code === 11000) {
      next(new ConflictError('Такой email уже занят'));
    }

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
    const { name, avatar, about } = req.body;

    const user = await User.findByIdAndUpdate(req.user?._id, {
      name,
      avatar,
      about,
    }, {
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
    const user = await User.findByIdAndUpdate(req.user?._id, {
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

export const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password').orFail(() => new UnauthorizedError('Проверьте email или пароль'));
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      next(new UnauthorizedError('Проверьте email или пароль'));
      return;
    }

    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '1d' });

    res
      .status(constants.HTTP_STATUS_OK)
      .cookie('token', token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    next(error);
  }
};
