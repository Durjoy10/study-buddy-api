import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PurchaseDocument = Purchase & Document;

@Schema({ timestamps: true })
export class Purchase {
    @Prop({ type: Types.ObjectId, ref: 'Material', required: true })
    material: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    buyer: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    seller: Types.ObjectId;

    @Prop({ required: true })
    price: number;

    @Prop({ enum: ['Bkash', 'Nagad', 'Rocket', 'Card'], required: true })
    paymentMethod: string;

    @Prop({ required: true })
    transactionId: string;

    @Prop({ enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' })
    status: string;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase); 