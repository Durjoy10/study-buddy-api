import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './schemas/project.schema';
export declare class ProjectsService {
    private projectModel;
    constructor(projectModel: Model<Project>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(filters?: any): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto, user: any): Promise<Project>;
    remove(id: string, user: any): Promise<Project>;
    joinProject(id: string, user: any): Promise<Project>;
    leaveProject(id: string, user: any): Promise<Project>;
    likeProject(id: string, user: any): Promise<Project>;
    unlikeProject(id: string, user: any): Promise<Project>;
}
