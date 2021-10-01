import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Post from '../typeorm/entities/Post';
import PostRepository from '../typeorm/repositories/PostsRepository';

interface IRequest {
    title: string;
    content: string;
    img_url: string;
}
class CreatePostService {
    public async execute({ title, content, img_url }: IRequest): Promise<Post> {
        const postsRepository = getCustomRepository(PostRepository);
        const postExists = await postsRepository.findByTitle(title);
        if (postExists) {
            throw new AppError('there is already one post with this name');
        }
        const post = postsRepository.create({
            title,
            content,
            img_url,
        });
        await postsRepository.save(post);
        return post;
    }
}
export default CreatePostService;
