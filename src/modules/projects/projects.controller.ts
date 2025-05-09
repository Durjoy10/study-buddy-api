import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { Types } from 'mongoose';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
        // Add the logged-in user as the creator
        createProjectDto.createdBy = new Types.ObjectId(req.user._id);
        return this.projectsService.create(createProjectDto);
    }

    @Get()
    findAll(@Query() filters: any) {
        return this.projectsService.findAll(filters);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Req() req) {
        return this.projectsService.update(id, updateProjectDto, req.user);
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(RolesGuard)
    remove(@Param('id') id: string, @Req() req) {
        return this.projectsService.remove(id, req.user);
    }

    @Post(':id/join')
    joinProject(@Param('id') id: string, @Req() req) {
        return this.projectsService.joinProject(id, req.user);
    }

    @Post(':id/leave')
    leaveProject(@Param('id') id: string, @Req() req) {
        return this.projectsService.leaveProject(id, req.user);
    }

    @Post(':id/like')
    likeProject(@Param('id') id: string, @Req() req) {
        return this.projectsService.likeProject(id, req.user);
    }

    @Post(':id/unlike')
    unlikeProject(@Param('id') id: string, @Req() req) {
        return this.projectsService.unlikeProject(id, req.user);
    }
} 