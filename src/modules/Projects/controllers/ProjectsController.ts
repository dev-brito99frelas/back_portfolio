import { Request, Response } from 'express';
import CreateProjectService from '../services/CreateProjectService';
import DeleteProjectService from '../services/DeleteProjectService';
import ListProjectService from '../services/ListProjectService';
import ShowProjectService from '../services/ShowProjectService';
import UpdateProjectService from '../services/UpdateProjectService';

export default class ProjectsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProjects = new ListProjectService();

        const projects = await listProjects.execute();

        return response.json(projects);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProject = new ShowProjectService();

        const project = await showProject.execute({ id });

        return response.json(project);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { title, content, img_url, img_youtube } = request.body;

        const createProject = new CreateProjectService();

        const project = await createProject.execute({
            title,
            content,
            img_url,
            img_youtube,
        });

        return response.json(project);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { title, content, img_url, img_youtube } = request.body;
        const { id } = request.params;

        const updateProject = new UpdateProjectService();

        const project = await updateProject.execute({
            id,
            title,
            content,
            img_url,
            img_youtube,
        });

        return response.json(project);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteProject = new DeleteProjectService();

        await deleteProject.execute({ id });

        return response.json([]);
    }
}
