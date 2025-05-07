import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePaperDto } from './dto/create-paper.dto';
import { PapersService } from './papers.service';

@ApiTags('papers')
@Controller('papers')
export class PapersController {
    constructor(private readonly papersService: PapersService) { }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                subject: { type: 'string' },
                semester: { type: 'string' },
                email: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/papers',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file) {
                    return cb(new BadRequestException('File is required'), false);
                }
                if (!file.originalname.match(/\.(pdf)$/)) {
                    return cb(new BadRequestException('Only PDF files are allowed'), false);
                }
                cb(null, true);
            },
        }),
    )
    async uploadPaper(
        @UploadedFile() file: Express.Multer.File,
        @Body() createPaperDto: CreatePaperDto,
    ) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        return this.papersService.create(createPaperDto, file.path);
    }

    @Get()
    findAll() {
        return this.papersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.papersService.findOne(id);
    }
} 