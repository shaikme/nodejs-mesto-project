import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { constants } from 'http2';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof mongoose.Error.CastError) {
    next();
    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Cущности с таким id не существует' });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
    return;
  }

  const { statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({ message: statusCode === constants.HTTP_STATUS_BAD_REQUEST ? 'На сервере произошла ошибка' : message });

  next();
};

export default errorHandler;
