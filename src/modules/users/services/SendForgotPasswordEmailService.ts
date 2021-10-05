import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherialMail from '@config/mail/EtherialMail';

interface IRequest {
    email: string;
}
class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError(' Users not exist');
        }
        const { token } = await userTokensRepository.generate(user.id);

        // console.log(token);
        await EtherialMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Api portifolio recuperação de senha',
            templateData: {
                template: `Olá {{name}}: {{token}} `,
                variables: {
                    name: user.name,
                    token,
                },
            },
        });
    }
}
export default SendForgotPasswordEmailService;
