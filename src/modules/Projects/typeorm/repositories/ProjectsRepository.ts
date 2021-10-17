import { EntityRepository, Repository } from 'typeorm';
import Project from '../entities/Project';

@EntityRepository(Project)
export default class ProjectRepository extends Repository<Project> {
    public async findByTitle(title: string): Promise<Project | undefined> {
        const project = this.findOne({ where: { title } });
        return project;
    }
}
