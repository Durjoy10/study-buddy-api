import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export enum MaterialType {
    Notes = 'Notes',
    Book = 'Book',
    Slides = 'Slides',
    Assignment = 'Assignment',
    Other = 'Other',
}

export class CreateMaterialDto {
    @ApiProperty({ description: 'Title of the material' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'Description of the material' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: 'Course name' })
    @IsNotEmpty()
    @IsString()
    course: string;

    @ApiProperty({ description: 'Type of material', enum: MaterialType })
    @IsNotEmpty()
    @IsEnum(MaterialType)
    type: MaterialType;

    @ApiProperty({ description: 'URL to the material file' })
    @IsNotEmpty()
    @IsUrl()
    fileUrl: string;

    @ApiProperty({ description: 'URL to the thumbnail image', required: false })
    @IsOptional()
    @IsUrl()
    thumbnailUrl?: string;

    @ApiProperty({ description: 'Price of the material', minimum: 0 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Department name' })
    @IsNotEmpty()
    @IsString()
    department: string;

    @ApiProperty({ description: 'Semester', required: false })
    @IsOptional()
    @IsString()
    semester?: string;

    @ApiProperty({ description: 'Year', required: false })
    @IsOptional()
    @IsNumber()
    year?: number;

    @ApiProperty({ description: 'Tags for the material', required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiProperty({ description: 'Whether the material is approved', default: false })
    @IsOptional()
    @IsBoolean()
    isApproved?: boolean;
} 