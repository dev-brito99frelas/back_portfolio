import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import ListUserService from '../services/ListUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;
        const createSession = new CreateSessionsService();
        const user = await createSession.execute({
            email,
            password,
        });
        return response.json(user);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUser = new ListUserService();
        const users = await listUser.execute();
        return response.json(users);
    }
}
