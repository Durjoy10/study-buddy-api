import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateMaterialDto {
    @ApiProperty({ example: 'Advanced Mathematics Notes', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'Comprehensive notes on advanced mathematics topics', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 9.99, required: false })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({ example: 'pdf', required: false })
    @IsString()
    @IsOptional()
    type?: string;

    @ApiProperty({ example: 'https://example.com/materials/math-notes.pdf', required: false })
    @IsUrl()
    @IsOptional()
    fileUrl?: string;

    @ApiProperty({ example: ['mathematics', 'notes', 'advanced'], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    isAvailable?: boolean;
} 