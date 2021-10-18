import { Router } from 'express';
import ProjectsController from '../controllers/ProjectsController';
import { celebrate, Joi, Segments } from 'celebrate';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.get('/', projectsController.index);

projectsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    projectsController.show,
);

projectsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            content: Joi.string().required(),
            img_url: Joi.string().required(),
            img_youtube: Joi.string().required(),
        },
    }),
    projectsController.create,
);

projectsRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            title: Joi.string().required(),
            content: Joi.string().required(),
            img_url: Joi.string().required(),
            img_youtube: Joi.string().required(),
        },
    }),
    projectsController.update,
);

projectsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    projectsController.delete,
);

export default projectsRouter;
