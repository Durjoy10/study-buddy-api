import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateProjectDto {
    @ApiProperty({ example: 'Study Buddy Mobile App', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'A mobile application for students to collaborate...', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'Web Development', required: false })
    @IsString()
    @IsOptional()
    category?: string;

    @ApiProperty({ example: 'Fall 2023', required: false })
    @IsString()
    @IsOptional()
    semester?: string;

    @ApiProperty({ example: 'CSE470 - Software Engineering', required: false })
    @IsString()
    @IsOptional()
    course?: string;

    @ApiProperty({ example: 2024, required: false })
    @IsNumber()
    @IsOptional()
    year?: number;

    @ApiProperty({ example: ['React', 'Node.js', 'MongoDB'], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    technologies?: string[];

    @ApiProperty({ example: ['web', 'mobile', 'education'], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiProperty({ example: 'https://example.com/thumbnail.jpg', required: false })
    @IsUrl()
    @IsOptional()
    thumbnailUrl?: string;

    @ApiProperty({ example: 'https://example.com/project.zip', required: false })
    @IsUrl()
    @IsOptional()
    fileURL?: string;

    @ApiProperty({ example: 'https://github.com/username/repo', required: false })
    @IsUrl()
    @IsOptional()
    repositoryUrl?: string;

    @ApiProperty({ example: 'https://demo.example.com', required: false })
    @IsUrl()
    @IsOptional()
    demoUrl?: string;

    @ApiProperty({ example: ['user456', 'user789'], required: false })
    @IsArray()
    @IsOptional()
    collaborators?: Types.ObjectId[];
} 