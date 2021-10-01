import { getCustomRepository } from 'typeorm';
import Post from '../typeorm/entities/Post';
import PostRepository from '../typeorm/repositories/PostsRepository';

class ListPostService {
    public async execute(): Promise<Post[]> {
        const postsRepository = getCustomRepository(PostRepository);
        const posts = postsRepository.find();
        return posts;
    }
}
export default ListPostService;
