import { Router } from 'express';
import postsRouter from '@modules/posts/routes/Posts.routes';

const routes = Router();
routes.use('/posts', postsRouter);
export default routes;
