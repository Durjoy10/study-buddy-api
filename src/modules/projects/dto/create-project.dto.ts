import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ example: 'Study Buddy Mobile App' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'A mobile application for students to collaborate...' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'user123' })
    @IsString()
    author: string;

    @ApiProperty({ example: ['user456', 'user789'], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    members?: string[];

    @ApiProperty({ example: ['mobile', 'education', 'collaboration'], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiProperty({ example: '2024-01-01', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;
} 