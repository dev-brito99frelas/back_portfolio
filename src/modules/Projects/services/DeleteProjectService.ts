import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProjectsRepository from '../typeorm/repositories/ProjectsRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    id: string;
}
export default class DeleteProjectService {
    public async execute({ id }: IRequest): Promise<void> {
        const projectsRepository = getCustomRepository(ProjectsRepository);
        const project = await projectsRepository.findOne(id);
        if (!project) {
            throw new AppError('project not found');
        }
        const redisCache = new RedisCache();
        await redisCache.inavalidate('api-porfitolio-projectS_LIST');
        await projectsRepository.remove(project);
    }
}
