import postsRouter from '@modules/posts/routes/Posts.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/posts', postsRouter);
export default routes;
