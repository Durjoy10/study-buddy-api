import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UploadsService } from './uploads.service';
import { FileDocument } from './schemas/file.schema';
import { Document } from 'mongoose';

@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file) {
                    return cb(new BadRequestException('File is required'), false);
                }
                // Allow all file types for now, can be restricted based on requirements
                cb(null, true);
            },
        }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        try {
            // Get user ID from JWT payload
            const userId = req.user?._id || req.user?.userId;
            if (!userId) {
                throw new BadRequestException('User ID not found in token');
            }

            // Construct the base URL
            const protocol = req.protocol;
            const host = req.get('host');
            const baseUrl = `${protocol}://${host}`;

            const fileData = {
                filename: file.filename,
                originalName: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                url: `${baseUrl}/uploads/${file.filename}`,
                uploadedBy: userId,
                relatedModel: req.body?.relatedModel || 'Project',
                relatedTo: req.body?.relatedTo,
                isPublic: true
            };

            console.log('Creating file with data:', fileData);
            const savedFile = await this.uploadsService.create(fileData);
            console.log('File saved successfully:', savedFile);

            // Convert Mongoose document to a plain JavaScript object
            const fileObject = savedFile instanceof Document ? savedFile.toObject() : savedFile;

            return {
                message: 'File uploaded successfully',
                data: {
                    ...fileObject,
                    fileUrl: fileObject.url // This will now be a full URL
                }
            };
        } catch (error) {
            console.error('File upload error:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message || 'Failed to upload file');
        }
    }
} 