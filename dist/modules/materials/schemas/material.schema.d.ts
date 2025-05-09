import { Document } from 'mongoose';
export declare class Material {
    title: string;
    description: string;
    condition: string;
    category: string;
    sellerName: string;
    sellerNumber: string;
    images: string[];
    price: number;
    url: string;
}
export type MaterialDocument = Material & Document;
export declare const MaterialSchema: import("mongoose").Schema<Material, import("mongoose").Model<Material, any, any, any, Document<unknown, any, Material> & Material & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Material, Document<unknown, {}, import("mongoose").FlatRecord<Material>> & import("mongoose").FlatRecord<Material> & {
    _id: import("mongoose").Types.ObjectId;
}>;
