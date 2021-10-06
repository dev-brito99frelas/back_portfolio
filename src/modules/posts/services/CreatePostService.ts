import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Post from '../typeorm/entities/Post';
import PostRepository from '../typeorm/repositories/PostsRepository';
import RedisCache from '@shared/cache/RedisCache';

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

        const redisCache = new RedisCache();
        const post = postsRepository.create({
            title,
            content,
            img_url,
        });

        await redisCache.inavalidate('api-porfitolio-POSTS_LIST');
        await postsRepository.save(post);
        return post;
    }
}
export default CreatePostService;
