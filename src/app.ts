import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import { constants } from 'http2'
import cookieParser from 'cookie-parser';
import { requestLogger, errorLogger } from './middlewares/logger';
import router from './routes';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use('/', router);

app.use('*', (_req: Request, res: Response) => res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: "Эндпойнт не найден" }));

app.use(errorLogger);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof mongoose.Error.CastError) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Cущности с таким id не существует' });
        return;
    }

    if (err instanceof mongoose.Error.ValidationError) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
        return;
    }

    const { statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

    res.status(statusCode).send({ message: statusCode === constants.HTTP_STATUS_BAD_REQUEST ? 'На сервере произошла ошибка' : message });
  });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
