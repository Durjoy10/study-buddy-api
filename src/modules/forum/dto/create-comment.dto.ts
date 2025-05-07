import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
    @ApiProperty({ description: 'Content of the comment' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: 'ID of the post this comment belongs to' })
    @IsNotEmpty()
    @IsMongoId()
    post: Types.ObjectId;

    @ApiProperty({ description: 'Whether this comment is an answer to a question', required: false })
    @IsOptional()
    @IsBoolean()
    isAnswer?: boolean;

    @ApiProperty({ description: 'ID of the parent comment for nested replies', required: false })
    @IsOptional()
    @IsMongoId()
    parentComment?: Types.ObjectId;
} 