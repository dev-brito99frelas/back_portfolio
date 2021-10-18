import AppError from '@shared/errors/AppError';
import Post from '../typeorm/entities/Project';
import { getCustomRepository } from 'typeorm';
import ProjectsRepository from '../typeorm/repositories/ProjectsRepository';

interface IRequest {
    id: string;
}
export default class ShowProjectService {
    public async execute({ id }: IRequest): Promise<Post | undefined> {
        const projectsRepository = getCustomRepository(ProjectsRepository);
        const post = projectsRepository.findOne(id);
        if (!post) {
            throw new AppError('Project not found');
        }
        return post;
    }
}
