import { getCustomRepository } from 'typeorm';
import Post from '../typeorm/entities/Post';
import PostRepository from '../typeorm/repositories/PostsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListPostService {
    public async execute(): Promise<Post[]> {
        const postsRepository = getCustomRepository(PostRepository);
        const redisCache = new RedisCache();
        let posts = await redisCache.recover<Post[]>(
            'api-porfitolio-POSTS_LIST',
        );
        if (!posts) {
            posts = await postsRepository.find();
            await redisCache.save('api-porfitolio-POSTS_LIST', posts);
        }
        return posts;
    }
}
export default ListPostService;
