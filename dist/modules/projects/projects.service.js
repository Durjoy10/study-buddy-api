"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("./schemas/project.schema");
let ProjectsService = class ProjectsService {
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async create(createProjectDto) {
        const createdProject = new this.projectModel(createProjectDto);
        return createdProject.save();
    }
    async findAll(filters = {}) {
        const query = this.projectModel.find();
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
        query.populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .sort({ createdAt: -1 });
        return query.exec();
    }
    async findOne(id) {
        const project = await this.projectModel
            .findById(id)
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        project.views += 1;
        await project.save();
        return project;
    }
    async update(id, updateProjectDto, user) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        if (project.createdBy.toString() !== user._id.toString() && !user.roles?.includes('admin')) {
            throw new common_1.ForbiddenException('You are not authorized to update this project');
        }
        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, updateProjectDto, { new: true })
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();
        return updatedProject;
    }
    async remove(id, user) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        if (project.createdBy.toString() !== user._id.toString() && !user.roles?.includes('admin')) {
            throw new common_1.ForbiddenException('You are not authorized to delete this project');
        }
        return this.projectModel.findByIdAndDelete(id).exec();
    }
    async joinProject(id, user) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
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
    async leaveProject(id, user) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        project.collaborators = project.collaborators.filter(collaborator => collaborator.toString() !== user._id.toString());
        await project.save();
        return this.projectModel
            .findById(id)
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();
    }
    async likeProject(id, user) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
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
    async unlikeProject(id, user) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        project.likes = project.likes.filter(like => like.toString() !== user._id.toString());
        await project.save();
        return this.projectModel
            .findById(id)
            .populate('createdBy', 'name email')
            .populate('collaborators', 'name email')
            .exec();
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map