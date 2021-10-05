import postsRouter from '@modules/posts/routes/Posts.routes';
import usersRouter from '@modules/users/routes/Users.routes';
import sessionsRouter from '@modules/users/routes/Sessions.routes';
import { Router } from 'express';
import passwordRouter from '@modules/users/routes/Password.routes';
import profileRouter from '@modules/users/routes/Profile.routes';

const routes = Router();
routes.use('/posts', postsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
export default routes;
