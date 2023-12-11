import express from 'express';
import { errors as celebrateErrors } from 'celebrate';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import router from './routes';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(celebrateErrors());

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
