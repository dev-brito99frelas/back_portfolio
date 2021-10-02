import AppError from '@shared/errors/AppError';
import Post from '../typeorm/entities/Post';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../typeorm/repositories/PostsRepository';

interface IRequest {
    id: string;
    title: string;
    content: string;
    img_url: string;
}
class UpdatePostService {
    public async execute({
        id,
        title,
        content,
        img_url,
    }: IRequest): Promise<Post | undefined> {
        const postsRepository = getCustomRepository(PostRepository);
        const post = await postsRepository.findOne(id);
        if (!post) {
            throw new AppError('post not found');
        }
        const postExists = await postsRepository.findByTitle(title);
        if (postExists) {
            throw new AppError('There is alredy one post whit this name');
        }
        post.title = title;
        post.content = content;
        post.img_url = img_url;
        await postsRepository.save(post);
        return post;
    }
}
export default UpdatePostService;
