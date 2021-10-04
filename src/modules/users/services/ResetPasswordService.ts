import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
// import User from '../typeorm/entities/User';
// import UserToken from '../typeorm/entities/UserToken';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}
class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);
        if (!userToken) {
            throw new AppError(' User token not exist');
        }
        const user = await usersRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError(' User token not exist');
        }
        const tokenCreated_at = userToken.created_at;
        const compararDate = addHours(tokenCreated_at, 2);

        if (isAfter(Date.now(), compararDate)) {
            throw new AppError('token expired');
        }
        user.password = await hash(password, 9);
    }
}
export default ResetPasswordService;
