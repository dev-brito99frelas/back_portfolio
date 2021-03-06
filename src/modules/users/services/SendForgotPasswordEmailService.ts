import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherialMail from '@config/mail/EtherialMail';
import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';

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
        const forgotPasswordTempalte = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );
        if (mailConfig.drive === 'ses') {
            await SESMail.sendMail({
                to: {
                    name: user.name,
                    email: user.email,
                },
                subject: '[Api portifolio recuperação de senha',
                templateData: {
                    file: forgotPasswordTempalte,
                    variables: {
                        name: user.name,
                        link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                    },
                },
            });
            return;
        }
        await EtherialMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Api portifolio recuperação de senha',
            templateData: {
                file: forgotPasswordTempalte,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}
export default SendForgotPasswordEmailService;
