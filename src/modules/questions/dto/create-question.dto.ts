import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
    @ApiProperty({ example: 'How to implement authentication in NestJS?' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'I need help with implementing JWT authentication...' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: 'user123' })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({ example: ['nestjs', 'authentication', 'jwt'], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];
} 