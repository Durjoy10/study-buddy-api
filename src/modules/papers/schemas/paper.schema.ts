import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaperDocument = Paper & Document;

@Schema({ timestamps: true })
export class Paper {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    subject: string;

    @Prop({ required: true })
    semester: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    filePath: string;

    @Prop({
        required: true,
        type: {
            name: { type: String, required: true },
            email: { type: String, required: true }
        }
    })
    uploadedBy: {
        name: string;
        email: string;
    };
}

export const PaperSchema = SchemaFactory.createForClass(Paper); 