import { Request, Response } from 'express';
import CreatePostService from '../services/CreatePostService';
import DeletePostService from '../services/DeletePostService';
import ListPostService from '../services/ListPostService';
import ShowPostService from '../services/ShowPostService';
import UpdatePostService from '../services/UpdatePostService';

export default class PostsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listPosts = new ListPostService();

        const posts = await listPosts.execute();

        return response.json(posts);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showPost = new ShowPostService();

        const post = await showPost.execute({ id });

        return response.json(post);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { title, content, img_url } = request.body;

        const createPost = new CreatePostService();

        const post = await createPost.execute({
            title,
            content,
            img_url,
        });

        return response.json(post);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { title, content, img_url } = request.body;
        const { id } = request.params;

        const updatePost = new UpdatePostService();

        const post = await updatePost.execute({
            id,
            title,
            content,
            img_url,
        });

        return response.json(post);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deletePost = new DeletePostService();

        await deletePost.execute({ id });

        return response.json([]);
    }
}
