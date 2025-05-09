import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaperDto {
    @ApiProperty({ description: 'Title of the paper' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Subject of the paper' })
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty({ description: 'Semester of the paper' })
    @IsString()
    @IsNotEmpty()
    semester: string;

    @ApiProperty({ description: 'Email for updates' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Name of the uploader' })
    @IsString()
    @IsNotEmpty()
    name: string;
} 