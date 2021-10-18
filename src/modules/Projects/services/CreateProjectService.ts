import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Project';
import ProjectsRepository from '../typeorm/repositories/ProjectsRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    title: string;
    content: string;
    img_url: string;
    img_youtube: string;
}
export default class CreateProjectService {
    public async execute({
        title,
        content,
        img_url,
        img_youtube,
    }: IRequest): Promise<Product> {
        const projectsRepository = getCustomRepository(ProjectsRepository);
        const postExists = await projectsRepository.findByTitle(title);
        if (postExists) {
            throw new AppError('there is already one post with this name');
        }

        const redisCache = new RedisCache();
        const project = projectsRepository.create({
            title,
            content,
            img_url,
            img_youtube,
        });

        await redisCache.inavalidate('api-porfitolio-PROJECTS_LIST');
        await projectsRepository.save(project);
        return project;
    }
}
