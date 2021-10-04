import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
sessionsRouter.get('/', isAuthenticated, sessionsController.index);
sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.create,
);
export default sessionsRouter;
