import { Document, Types } from 'mongoose';
export type MaterialDocument = Material & Document;
export declare class Material {
    title: string;
    description: string;
    course: string;
    type: string;
    fileUrl: string;
    thumbnailUrl: string;
    price: number;
    seller: Types.ObjectId;
    downloads: number;
    department: string;
    semester: string;
    year: number;
    tags: string[];
    isApproved: boolean;
}
export declare const MaterialSchema: import("mongoose").Schema<Material, import("mongoose").Model<Material, any, any, any, Document<unknown, any, Material> & Material & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Material, Document<unknown, {}, import("mongoose").FlatRecord<Material>> & import("mongoose").FlatRecord<Material> & {
    _id: Types.ObjectId;
}>;
