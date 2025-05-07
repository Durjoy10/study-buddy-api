import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { Material, MaterialSchema } from './schemas/material.schema';
import { Purchase, PurchaseSchema } from './schemas/purchase.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Material.name, schema: MaterialSchema },
            { name: Purchase.name, schema: PurchaseSchema },
        ]),
    ],
    controllers: [MaterialsController],
    providers: [MaterialsService],
    exports: [MaterialsService],
})
export class MaterialsModule { }
