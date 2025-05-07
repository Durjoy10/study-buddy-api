import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
    @ApiProperty({ example: 'How to implement authentication in NestJS?', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'I need help with implementing JWT authentication...', required: false })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiProperty({ example: ['nestjs', 'authentication', 'jwt'], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    isAnswered?: boolean;
} 