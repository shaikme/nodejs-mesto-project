import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import cardRouter from './routes/cards';
import userRouter from './routes/users';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    req.user = {
      _id: '656f7fb31b5abb1d8b86ce3a',
    };

    next();
  });

app.use('/user', userRouter);
app.use('/card', cardRouter);
app.use('*', (req: Request, res: Response) => res.status(404).send());

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof mongoose.Error.CastError) {
        // Handle this error
        res.status(400).send({ message: 'Cущности с таким id не существует' });
    }

    const { statusCode = 500, message } = err;

    res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
