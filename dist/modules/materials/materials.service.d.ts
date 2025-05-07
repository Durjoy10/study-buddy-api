import { Model, Types } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './schemas/material.schema';
import { Purchase } from './schemas/purchase.schema';
export declare class MaterialsService {
    private materialModel;
    private purchaseModel;
    constructor(materialModel: Model<Material>, purchaseModel: Model<Purchase>);
    create(createMaterialDto: CreateMaterialDto, sellerId: Types.ObjectId): Promise<Material>;
    findAll(query?: any): Promise<Material[]>;
    findOne(id: string): Promise<Material>;
    update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<Material>;
    remove(id: string): Promise<void>;
    purchase(materialId: string, buyerId: Types.ObjectId): Promise<Purchase>;
    approveMaterial(id: string): Promise<Material>;
    getSellerMaterials(sellerId: Types.ObjectId): Promise<Material[]>;
    getPurchaseHistory(userId: Types.ObjectId): Promise<Purchase[]>;
    getSalesHistory(sellerId: Types.ObjectId): Promise<Purchase[]>;
    updatePurchaseStatus(purchaseId: string, status: 'Pending' | 'Completed' | 'Failed' | 'Refunded', transactionId?: string): Promise<Purchase>;
    searchMaterials(query: string): Promise<Material[]>;
}
