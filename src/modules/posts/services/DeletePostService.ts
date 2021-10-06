import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../typeorm/repositories/PostsRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    id: string;
}
class DeletePostService {
    public async execute({ id }: IRequest): Promise<void> {
        const postsRepository = getCustomRepository(PostRepository);
        const post = await postsRepository.findOne(id);
        if (!post) {
            throw new AppError('post not found');
        }
        const redisCache = new RedisCache();
        await redisCache.inavalidate('api-porfitolio-POSTS_LIST');
        await postsRepository.remove(post);
    }
}
export default DeletePostService;
