import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
    @ApiProperty({ example: 'Study Buddy Mobile App', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'A mobile application for students to collaborate...', required: false })
    @IsString()
    @IsOptional()
    description?: string;

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

    @ApiProperty({ example: 'completed', required: false })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({ example: '2024-01-01', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;
} 