import AppError from '@shared/errors/AppError';
import Project from '../typeorm/entities/Project';
import { getCustomRepository } from 'typeorm';
import ProjectsRepository from '../typeorm/repositories/ProjectsRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    id: string;
    title: string;
    content: string;
    img_url: string;
    img_youtube: string;
}
export default class UpdateProjectService {
    public async execute({
        id,
        title,
        content,
        img_url,
        img_youtube,
    }: IRequest): Promise<Project | undefined> {
        const projectsRepository = getCustomRepository(ProjectsRepository);
        const project = await projectsRepository.findOne(id);
        if (!project) {
            throw new AppError('project not found');
        }
        const projectExists = await projectsRepository.findByTitle(title);
        if (projectExists) {
            throw new AppError('There is alredy one project whit this name');
        }
        const redisCache = new RedisCache();
        await redisCache.inavalidate('api-porfitolio-projectS_LIST');
        project.title = title;
        project.content = content;
        project.img_url = img_url;
        project.img_youtube = img_youtube;
        await projectsRepository.save(project);
        return project;
    }
}
