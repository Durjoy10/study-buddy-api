"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const uploads_service_1 = require("./uploads.service");
const mongoose_1 = require("mongoose");
let UploadsController = class UploadsController {
    constructor(uploadsService) {
        this.uploadsService = uploadsService;
    }
    async uploadFile(file, req) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        try {
            const userId = req.user?._id || req.user?.userId;
            if (!userId) {
                throw new common_1.BadRequestException('User ID not found in token');
            }
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
            const fileObject = savedFile instanceof mongoose_1.Document ? savedFile.toObject() : savedFile;
            return {
                message: 'File uploaded successfully',
                data: {
                    ...fileObject,
                    fileUrl: fileObject.url
                }
            };
        }
        catch (error) {
            console.error('File upload error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(error.message || 'Failed to upload file');
        }
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file) {
                return cb(new common_1.BadRequestException('File is required'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadFile", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [uploads_service_1.UploadsService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map