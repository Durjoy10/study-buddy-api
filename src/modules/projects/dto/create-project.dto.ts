import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, IsUrl, ValidateIf } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjectDto {
    @ApiProperty({ example: 'Study Buddy Mobile App' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'A mobile application for students to collaborate...' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'Web Development' })
    @IsString()
    category: string;

    @ApiProperty({ example: 'Fall 2023' })
    @IsString()
    semester: string;

    @ApiProperty({ example: 'CSE470 - Software Engineering' })
    @IsString()
    course: string;

    @ApiProperty({ example: 2024 })
    @IsNumber()
    year: number;

    @ApiProperty()
    @IsOptional()
    createdBy?: Types.ObjectId;

    @ApiProperty({ example: ['React', 'Node.js', 'MongoDB'] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    technologies?: string[];

    @ApiProperty({ example: ['web', 'mobile', 'education'] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
    @ValidateIf((o) => o.thumbnailUrl !== undefined && o.thumbnailUrl !== '')
    @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
    @IsOptional()
    thumbnailUrl?: string;

    @ApiProperty({ example: 'https://example.com/project.zip' })
    @ValidateIf((o) => o.fileURL !== undefined && o.fileURL !== '')
    @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
    @IsOptional()
    fileURL?: string;

    @ApiProperty({ example: 'https://github.com/username/repo' })
    @ValidateIf((o) => o.repositoryUrl !== undefined && o.repositoryUrl !== '')
    @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
    @IsOptional()
    repositoryUrl?: string;

    @ApiProperty({ example: 'https://demo.example.com' })
    @ValidateIf((o) => o.demoUrl !== undefined && o.demoUrl !== '')
    @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
    @IsOptional()
    demoUrl?: string;

    @ApiProperty({ example: ['user456', 'user789'] })
    @IsArray()
    @IsOptional()
    collaborators?: Types.ObjectId[];
} 