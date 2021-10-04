import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './../routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadconfig from '@config/upload';

const app = express();
app.use(express.json());
app.use(cors());
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
    console.log('Api do meu blog rodando liso...:robot:');
});
