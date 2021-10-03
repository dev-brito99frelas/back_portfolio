import postsRouter from '@modules/posts/routes/Posts.routes';
import usersRouter from '@modules/users/routes/Users.routes';
import sessionsRouter from '@modules/users/routes/Sessions.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/posts', postsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
export default routes;
