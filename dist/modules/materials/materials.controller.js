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
exports.MaterialsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const update_material_dto_1 = require("./dto/update-material.dto");
const materials_service_1 = require("./materials.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let MaterialsController = class MaterialsController {
    constructor(materialsService) {
        this.materialsService = materialsService;
    }
    async create(files, body, req) {
        const images = files.map(file => `/uploads/marketplace/${file.filename}`);
        const dto = {
            ...body,
            images,
            price: Number(body.price),
        };
        return this.materialsService.create(dto, req.user._id);
    }
    async findAll(query) {
        return this.materialsService.findAll(query);
    }
    async search(query) {
        return this.materialsService.searchMaterials(query);
    }
    async findOne(id) {
        return this.materialsService.findOne(id);
    }
    async update(id, updateMaterialDto) {
        return this.materialsService.update(id, updateMaterialDto);
    }
    async remove(id) {
        return this.materialsService.remove(id);
    }
    async purchase(id, req) {
        return this.materialsService.purchase(id, req.user._id);
    }
    async approveMaterial(id) {
        return this.materialsService.approveMaterial(id);
    }
    async getSellerMaterials(req) {
        return this.materialsService.getSellerMaterials(req.user._id);
    }
    async getPurchaseHistory(req) {
        return this.materialsService.getPurchaseHistory(req.user._id);
    }
    async getSalesHistory(req) {
        return this.materialsService.getSalesHistory(req.user._id);
    }
    async updatePurchaseStatus(id, status, transactionId) {
        return this.materialsService.updatePurchaseStatus(id, status, transactionId);
    }
};
exports.MaterialsController = MaterialsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/marketplace',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            }
        })
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new material' }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all materials' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search materials' }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a material by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a material' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_material_dto_1.UpdateMaterialDto]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a material' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/purchase'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Purchase a material' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "purchase", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a material' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "approveMaterial", null);
__decorate([
    (0, common_1.Get)('seller/materials'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller\'s materials' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getSellerMaterials", null);
__decorate([
    (0, common_1.Get)('purchases/history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get user\'s purchase history' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getPurchaseHistory", null);
__decorate([
    (0, common_1.Get)('sales/history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get seller\'s sales history' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getSalesHistory", null);
__decorate([
    (0, common_1.Patch)('purchases/:id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update purchase status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('transactionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "updatePurchaseStatus", null);
exports.MaterialsController = MaterialsController = __decorate([
    (0, swagger_1.ApiTags)('materials'),
    (0, common_1.Controller)('materials'),
    __metadata("design:paramtypes", [materials_service_1.MaterialsService])
], MaterialsController);
//# sourceMappingURL=materials.controller.js.map