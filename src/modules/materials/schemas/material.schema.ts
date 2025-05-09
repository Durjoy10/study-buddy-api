import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Material {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    condition: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    sellerName: string;

    @Prop({ required: true })
    sellerNumber: string;

    @Prop([String])
    images: string[];

    @Prop({ required: true, default: 0 })
    price: number;

    @Prop()
    url: string;
}

export type MaterialDocument = Material & Document;
export const MaterialSchema = SchemaFactory.createForClass(Material); 