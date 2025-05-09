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
exports.PapersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const create_paper_dto_1 = require("./dto/create-paper.dto");
const papers_service_1 = require("./papers.service");
let PapersController = class PapersController {
    constructor(papersService) {
        this.papersService = papersService;
    }
    async uploadPaper(file, createPaperDto) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        return this.papersService.create(createPaperDto, file.path);
    }
    findAll() {
        return this.papersService.findAll();
    }
    findOne(id) {
        return this.papersService.findOne(id);
    }
    async downloadPaper(id, res) {
        const paper = await this.papersService.findOne(id);
        if (!paper) {
            throw new common_1.BadRequestException('Paper not found');
        }
        return res.sendFile((0, path_1.join)(process.cwd(), paper.filePath));
    }
};
exports.PapersController = PapersController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                subject: { type: 'string' },
                semester: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/papers',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file) {
                return cb(new common_1.BadRequestException('File is required'), false);
            }
            if (!file.originalname.match(/\.(pdf)$/)) {
                return cb(new common_1.BadRequestException('Only PDF files are allowed'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_paper_dto_1.CreatePaperDto]),
    __metadata("design:returntype", Promise)
], PapersController.prototype, "uploadPaper", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PapersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PapersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PapersController.prototype, "downloadPaper", null);
exports.PapersController = PapersController = __decorate([
    (0, swagger_1.ApiTags)('papers'),
    (0, common_1.Controller)('papers'),
    __metadata("design:paramtypes", [papers_service_1.PapersService])
], PapersController);
//# sourceMappingURL=papers.controller.js.map