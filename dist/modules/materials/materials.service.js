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
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const material_schema_1 = require("./schemas/material.schema");
const purchase_schema_1 = require("./schemas/purchase.schema");
let MaterialsService = class MaterialsService {
    constructor(materialModel, purchaseModel) {
        this.materialModel = materialModel;
        this.purchaseModel = purchaseModel;
    }
    async create(createMaterialDto, sellerId) {
        const material = new this.materialModel({
            ...createMaterialDto
        });
        return material.save();
    }
    async findAll(query = {}) {
        return this.materialModel.find(query)
            .sort({ createdAt: -1 })
            .exec();
    }
    async findOne(id) {
        const material = await this.materialModel.findById(id)
            .exec();
        if (!material) {
            throw new common_1.NotFoundException('Material not found');
        }
        return material;
    }
    async update(id, updateMaterialDto) {
        const material = await this.materialModel.findByIdAndUpdate(id, { $set: updateMaterialDto }, { new: true }).exec();
        if (!material) {
            throw new common_1.NotFoundException('Material not found');
        }
        return material;
    }
    async remove(id) {
        const result = await this.materialModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Material not found');
        }
    }
    async purchase(materialId, buyerId) {
        const material = await this.materialModel.findById(materialId);
        if (!material) {
            throw new common_1.NotFoundException('Material not found');
        }
        const existingPurchase = await this.purchaseModel.findOne({
            material: materialId,
            buyer: buyerId,
            status: 'Completed',
        });
        if (existingPurchase) {
            throw new common_1.BadRequestException('Material already purchased');
        }
        const purchase = new this.purchaseModel({
            material: materialId,
            buyer: buyerId,
            price: material.price,
            status: 'Pending',
        });
        return purchase.save();
    }
    async approveMaterial(id) {
        const material = await this.materialModel.findByIdAndUpdate(id, { $set: { isApproved: true } }, { new: true }).exec();
        if (!material) {
            throw new common_1.NotFoundException('Material not found');
        }
        return material;
    }
    async getSellerMaterials(sellerId) {
        return this.materialModel.find({ seller: sellerId })
            .sort({ createdAt: -1 })
            .exec();
    }
    async getPurchaseHistory(userId) {
        return this.purchaseModel.find({ buyer: userId })
            .populate('material')
            .populate('seller', 'name email profilePicture')
            .sort({ purchaseDate: -1 })
            .exec();
    }
    async getSalesHistory(sellerId) {
        return this.purchaseModel.find({ seller: sellerId })
            .populate('material')
            .populate('buyer', 'name email profilePicture')
            .sort({ purchaseDate: -1 })
            .exec();
    }
    async updatePurchaseStatus(purchaseId, status, transactionId) {
        const update = { status };
        if (transactionId) {
            update.transactionId = transactionId;
        }
        const purchase = await this.purchaseModel.findByIdAndUpdate(purchaseId, { $set: update }, { new: true }).exec();
        if (!purchase) {
            throw new common_1.NotFoundException('Purchase not found');
        }
        if (status === 'Completed') {
            await this.materialModel.findByIdAndUpdate(purchase.material, { $inc: { downloads: 1 } }).exec();
        }
        return purchase;
    }
    async searchMaterials(query) {
        return this.materialModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { course: { $regex: query, $options: 'i' } },
                { department: { $regex: query, $options: 'i' } },
                { tags: { $in: [new RegExp(query, 'i')] } },
            ],
        })
            .sort({ createdAt: -1 })
            .exec();
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(material_schema_1.Material.name)),
    __param(1, (0, mongoose_1.InjectModel)(purchase_schema_1.Purchase.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MaterialsService);
//# sourceMappingURL=materials.service.js.map