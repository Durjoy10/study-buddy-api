import { Document, Types } from 'mongoose';
export type PurchaseDocument = Purchase & Document;
export declare class Purchase {
    material: Types.ObjectId;
    buyer: Types.ObjectId;
    seller: Types.ObjectId;
    price: number;
    paymentMethod: string;
    transactionId: string;
    status: string;
}
export declare const PurchaseSchema: import("mongoose").Schema<Purchase, import("mongoose").Model<Purchase, any, any, any, Document<unknown, any, Purchase> & Purchase & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Purchase, Document<unknown, {}, import("mongoose").FlatRecord<Purchase>> & import("mongoose").FlatRecord<Purchase> & {
    _id: Types.ObjectId;
}>;
