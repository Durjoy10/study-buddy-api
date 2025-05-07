import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<import("./schemas/project.schema").Project>;
    findAll(): Promise<import("./schemas/project.schema").Project[]>;
    findOne(id: string): Promise<import("./schemas/project.schema").Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("./schemas/project.schema").Project>;
    remove(id: string): Promise<import("./schemas/project.schema").Project>;
}
