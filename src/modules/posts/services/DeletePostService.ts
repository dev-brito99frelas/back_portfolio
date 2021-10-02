import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PostRepository from '../typeorm/repositories/PostsRepository';

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
        await postsRepository.remove(post);
    }
}
export default DeletePostService;
