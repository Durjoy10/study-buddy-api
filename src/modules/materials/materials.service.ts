import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMarketplaceItemDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './schemas/material.schema';
import { Purchase } from './schemas/purchase.schema';

@Injectable()
export class MaterialsService {
    constructor(
        @InjectModel(Material.name) private materialModel: Model<Material>,
        @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    ) { }

    async create(createMaterialDto: CreateMarketplaceItemDto, sellerId: Types.ObjectId): Promise<Material> {
        const material = new this.materialModel({
            ...createMaterialDto
        });
        return material.save();
    }

    async findAll(query: any = {}): Promise<Material[]> {
        return this.materialModel.find(query)
            .sort({ createdAt: -1 })
            .exec();
    }

    async findOne(id: string): Promise<Material> {
        const material = await this.materialModel.findById(id)
            .exec();
        if (!material) {
            throw new NotFoundException('Material not found');
        }
        return material;
    }

    async update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
        const material = await this.materialModel.findByIdAndUpdate(
            id,
            { $set: updateMaterialDto },
            { new: true }
        ).exec();
        if (!material) {
            throw new NotFoundException('Material not found');
        }
        return material;
    }

    async remove(id: string): Promise<void> {
        const result = await this.materialModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Material not found');
        }
    }

    async purchase(materialId: string, buyerId: Types.ObjectId): Promise<Purchase> {
        const material = await this.materialModel.findById(materialId);
        if (!material) {
            throw new NotFoundException('Material not found');
        }

        // Check if already purchased
        const existingPurchase = await this.purchaseModel.findOne({
            material: materialId,
            buyer: buyerId,
            status: 'Completed',
        });

        if (existingPurchase) {
            throw new BadRequestException('Material already purchased');
        }

        const purchase = new this.purchaseModel({
            material: materialId,
            buyer: buyerId,
            price: material.price,
            status: 'Pending',
        });

        return purchase.save();
    }

    async approveMaterial(id: string): Promise<Material> {
        const material = await this.materialModel.findByIdAndUpdate(
            id,
            { $set: { isApproved: true } },
            { new: true }
        ).exec();
        if (!material) {
            throw new NotFoundException('Material not found');
        }
        return material;
    }

    async getSellerMaterials(sellerId: Types.ObjectId): Promise<Material[]> {
        return this.materialModel.find({ seller: sellerId })
            .sort({ createdAt: -1 })
            .exec();
    }

    async getPurchaseHistory(userId: Types.ObjectId): Promise<Purchase[]> {
        return this.purchaseModel.find({ buyer: userId })
            .populate('material')
            .populate('seller', 'name email profilePicture')
            .sort({ purchaseDate: -1 })
            .exec();
    }

    async getSalesHistory(sellerId: Types.ObjectId): Promise<Purchase[]> {
        return this.purchaseModel.find({ seller: sellerId })
            .populate('material')
            .populate('buyer', 'name email profilePicture')
            .sort({ purchaseDate: -1 })
            .exec();
    }

    async updatePurchaseStatus(
        purchaseId: string,
        status: 'Pending' | 'Completed' | 'Failed' | 'Refunded',
        transactionId?: string,
    ): Promise<Purchase> {
        const update: any = { status };
        if (transactionId) {
            update.transactionId = transactionId;
        }

        const purchase = await this.purchaseModel.findByIdAndUpdate(
            purchaseId,
            { $set: update },
            { new: true }
        ).exec();

        if (!purchase) {
            throw new NotFoundException('Purchase not found');
        }

        if (status === 'Completed') {
            // Increment material downloads
            await this.materialModel.findByIdAndUpdate(
                purchase.material,
                { $inc: { downloads: 1 } }
            ).exec();
        }

        return purchase;
    }

    async searchMaterials(query: string): Promise<Material[]> {
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
} 