import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authconfig from '@config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('jwt token is missing.');
    }
    //é retornado uma string composta e separada por espaço então dividimos com split que retorna um
    //array e desestruturamos o array para pegar so a parte do token
    const [, token] = authHeader.split(' ');
    try {
        const decodedToken = verify(token, authconfig.jwt.secret);
        const { sub } = decodedToken as TokenPayload;
        request.user = {
            id: sub,
        };
        return next();
    } catch {
        throw new AppError('invalid jet token');
    }
}
