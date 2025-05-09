import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto, req: any): Promise<import("./schemas/project.schema").Project>;
    findAll(filters: any): Promise<import("./schemas/project.schema").Project[]>;
    findOne(id: string): Promise<import("./schemas/project.schema").Project>;
    update(id: string, updateProjectDto: UpdateProjectDto, req: any): Promise<import("./schemas/project.schema").Project>;
    remove(id: string, req: any): Promise<import("./schemas/project.schema").Project>;
    joinProject(id: string, req: any): Promise<import("./schemas/project.schema").Project>;
    leaveProject(id: string, req: any): Promise<import("./schemas/project.schema").Project>;
    likeProject(id: string, req: any): Promise<import("./schemas/project.schema").Project>;
    unlikeProject(id: string, req: any): Promise<import("./schemas/project.schema").Project>;
}
