import { Router } from 'express';
import PostsController from '../controllers/PostsController';
import { celebrate, Joi, Segments } from 'celebrate';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.get('/', postsController.index);

postsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    postsController.show,
);

postsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            content: Joi.number().precision(2).required(),
            img_url: Joi.number().required(),
        },
    }),
    postsController.create,
);

postsRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            title: Joi.string().required(),
            content: Joi.number().precision(2).required(),
            img_url: Joi.number().required(),
        },
    }),
    postsController.update,
);

postsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    postsController.delete,
);

export default postsRouter;
