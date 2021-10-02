import AppError from '@shared/errors/AppError';
import Post from '../typeorm/entities/Post';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../typeorm/repositories/PostsRepository';

interface IRequest {
    id: string;
}
class ShowPostService {
    public async execute({ id }: IRequest): Promise<Post | undefined> {
        const postsRepository = getCustomRepository(PostRepository);
        const post = postsRepository.findOne(id);
        if (!post) {
            throw new AppError('Post not found');
        }
        return post;
    }
}
export default ShowPostService;
