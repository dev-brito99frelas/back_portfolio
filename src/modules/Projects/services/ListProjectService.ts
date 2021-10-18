import { getCustomRepository } from 'typeorm';
import Project from '../typeorm/entities/Project';
import ProjectsRepository from '../typeorm/repositories/ProjectsRepository';
import RedisCache from '@shared/cache/RedisCache';

export default class ListProjectService {
    public async execute(): Promise<Project[]> {
        const projectsRepository = getCustomRepository(ProjectsRepository);
        const redisCache = new RedisCache();
        let projects = await redisCache.recover<Project[]>(
            'api-porfitolio-project_LIST',
        );
        if (!projects) {
            projects = await projectsRepository.find();
            await redisCache.save('api-porfitolio-project_LIST', projects);
        }
        return projects;
    }
}
