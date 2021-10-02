import { Request, Response } from 'express';
import CreatePostService from '../services/CreatePostService';
import DeletePostService from '../services/DeletePostService';
import ListPostService from '../services/ListPostService';
import UpdatePostService from '../services/UpdatePostService';
import ShowPostService from '../services/ShowPostService';

export default class PostsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listposts = new ListPostService();
        const posts = await listposts.execute();
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
        const post = await createPost.execute({ title, content, img_url });
        return response.json(post);
    }
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { title, content, img_url } = request.body;
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
        const deletepost = new DeletePostService();
        await deletepost.execute({ id });
        return response.json([]);
    }
}
