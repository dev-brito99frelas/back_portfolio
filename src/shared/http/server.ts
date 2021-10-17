import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './../routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadconfig from '@config/upload';
import ratelimiter from './middlewares/rateLimiter';

const app = express();
app.use(express.json());
app.use(cors());
app.use(ratelimiter);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin", "*');
    res.header(
        'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});
app.use('/files', express.static(uploadconfig.directory));
app.use(routes);
app.use(errors());
/**
 * @description Depois da criação de rotas fazemos esse tratamento com o middleware de eeros customizados*/
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }
        return response.status(500).json({
            status: 'error',
            message: 'Internal server Error',
        });
    },
);

app.listen(3333, () => {
    console.log('Api rodando :.:..:..:..:..:');
});
