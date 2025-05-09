import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMarketplaceItemDto {
  @ApiProperty() @IsNotEmpty() @IsString() title: string;
  @ApiProperty() @IsNotEmpty() @IsString() description: string;
  @ApiProperty() @IsNotEmpty() @IsString() condition: string;
  @ApiProperty() @IsNotEmpty() @IsString() category: string;
  @ApiProperty() @IsNotEmpty() @IsString() sellerName: string;
  @ApiProperty() @IsNotEmpty() @IsString() sellerNumber: string;
  @ApiProperty({ type: [String] }) @IsArray() images: string[];
  @ApiProperty() @IsNotEmpty() @IsNumber() @Min(0) price: number;
  @ApiProperty({ required: false }) @IsOptional() @IsString() url?: string;
} 