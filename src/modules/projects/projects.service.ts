import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project>,
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const createdProject = new this.projectModel(createProjectDto);
        return createdProject.save();
    }

    async findAll(filters: any = {}): Promise<Project[]> {
        const query = this.projectModel.find();

        // Apply filters
        if (filters.category) {
            query.where('category').equals(filters.category);
        }
        if (filters.semester) {
            query.where('semester').equals(filters.semester);
        }
        if (filters.course) {
            query.where('course').equals(filters.course);
        }
        if (filters.year) {
            query.where('year').equals(filters.year);
        }
        if (filters.technologies) {
            query.where('technologies').in(filters.technologies.split(','));
        }
        if (filters.search) {
            query.or([
                { title: { $regex: filters.search, $options: 'i' } },
                { description: { $regex: filters.search, $options: 'i' } },
                { tags: { $regex: filters.search, $options: 'i' } }
            ]);
        }

        // Populate user fields
        query.populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .sort({ createdAt: -1 });

        return query.exec();
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectModel
            .findById(id)
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        // Increment views
        project.views += 1;
        await project.save();

        return project;
    }

    async update(id: string, updateProjectDto: UpdateProjectDto, user: any): Promise<Project> {
        const project = await this.projectModel.findById(id);
        
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        // Check if user is authorized to update
        if (project.createdBy.toString() !== user._id.toString() && !user.roles?.includes('admin')) {
            throw new ForbiddenException('You are not authorized to update this project');
        }

        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, updateProjectDto, { new: true })
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();

        return updatedProject;
    }

    async remove(id: string, user: any): Promise<Project> {
        const project = await this.projectModel.findById(id);
        
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        // Check if user is authorized to delete
        if (project.createdBy.toString() !== user._id.toString() && !user.roles?.includes('admin')) {
            throw new ForbiddenException('You are not authorized to delete this project');
        }

        return this.projectModel.findByIdAndDelete(id).exec();
    }

    async joinProject(id: string, user: any): Promise<Project> {
        const project = await this.projectModel.findById(id);
        
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        if (!project.collaborators.includes(user._id)) {
            project.collaborators.push(user._id);
            await project.save();
        }

        return this.projectModel
            .findById(id)
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();
    }

    async leaveProject(id: string, user: any): Promise<Project> {
        const project = await this.projectModel.findById(id);
        
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        project.collaborators = project.collaborators.filter(
            collaborator => collaborator.toString() !== user._id.toString()
        );
        await project.save();

        return this.projectModel
            .findById(id)
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();
    }

    async likeProject(id: string, user: any): Promise<Project> {
        const project = await this.projectModel.findById(id);
        
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        if (!project.likes.includes(user._id)) {
            project.likes.push(user._id);
            await project.save();
        }

        return this.projectModel
            .findById(id)
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();
    }

    async unlikeProject(id: string, user: any): Promise<Project> {
        const project = await this.projectModel.findById(id);
        
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        project.likes = project.likes.filter(
            like => like.toString() !== user._id.toString()
        );
        await project.save();

        return this.projectModel
            .findById(id)
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();
    }
} 