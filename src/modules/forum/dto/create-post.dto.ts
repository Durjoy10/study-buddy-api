import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum PostCategory {
    General = 'General',
    Question = 'Question',
    Discussion = 'Discussion',
    Announcement = 'Announcement',
}

export class CreatePostDto {
    @ApiProperty({ description: 'Title of the post' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'Content of the post' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: 'Category of the post', enum: PostCategory })
    @IsNotEmpty()
    @IsEnum(PostCategory)
    category: PostCategory;

    @ApiProperty({ description: 'Tags for the post', required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
} 