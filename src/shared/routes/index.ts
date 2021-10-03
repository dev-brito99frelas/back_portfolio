import postsRouter from '@modules/posts/routes/Posts.routes';
import usersRouter from '@modules/users/routes/Users.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/posts', postsRouter);
routes.use('/users', usersRouter);
export default routes;
