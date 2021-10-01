// import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
// import { errors } from 'celebrate';
import routes from './../routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
/**
 * @description Depois da criação de rotas fazemos esse tratamento com o middleware de eeros customizados*/
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        /**
         * @description se o erro for uma instancia da nossa classe, usamos a classe para tratar*/
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }
        return response.status(500).json({
            //se não for tratamos como desconhecido
            status: 'error',
            message: 'Internal server Error',
        });
    },
);

app.listen(3333, () => {
    console.log('Api do meu blog rodando liso...:robot:');
});
