import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService } from './materials.service';
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    create(createMaterialDto: CreateMaterialDto, req: any): Promise<import("./schemas/material.schema").Material>;
    findAll(query: any): Promise<import("./schemas/material.schema").Material[]>;
    search(query: string): Promise<import("./schemas/material.schema").Material[]>;
    findOne(id: string): Promise<import("./schemas/material.schema").Material>;
    update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<import("./schemas/material.schema").Material>;
    remove(id: string): Promise<void>;
    purchase(id: string, req: any): Promise<import("./schemas/purchase.schema").Purchase>;
    approveMaterial(id: string): Promise<import("./schemas/material.schema").Material>;
    getSellerMaterials(req: any): Promise<import("./schemas/material.schema").Material[]>;
    getPurchaseHistory(req: any): Promise<import("./schemas/purchase.schema").Purchase[]>;
    getSalesHistory(req: any): Promise<import("./schemas/purchase.schema").Purchase[]>;
    updatePurchaseStatus(id: string, status: 'Pending' | 'Completed' | 'Failed' | 'Refunded', transactionId?: string): Promise<import("./schemas/purchase.schema").Purchase>;
}
