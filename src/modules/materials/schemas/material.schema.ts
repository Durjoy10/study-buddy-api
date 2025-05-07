import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MaterialDocument = Material & Document;

@Schema({ timestamps: true })
export class Material {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    course: string;

    @Prop({ enum: ['Notes', 'Book', 'Slides', 'Assignment', 'Other'], required: true })
    type: string;

    @Prop({ required: true })
    fileUrl: string;

    @Prop()
    thumbnailUrl: string;

    @Prop({ default: 0 })
    price: number;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    seller: Types.ObjectId;

    @Prop({ default: 0 })
    downloads: number;

    @Prop({ required: true })
    department: string;

    @Prop()
    semester: string;

    @Prop()
    year: number;

    @Prop([String])
    tags: string[];

    @Prop({ default: false })
    isApproved: boolean;
}

export const MaterialSchema = SchemaFactory.createForClass(Material); 