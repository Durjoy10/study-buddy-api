import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    originalName: string;

    @Prop({ required: true })
    mimetype: string;

    @Prop({ required: true })
    size: number;

    @Prop({ required: true })
    url: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    uploadedBy: Types.ObjectId;

    @Prop({ type: Types.ObjectId })
    relatedTo: Types.ObjectId;

    @Prop({ enum: ['Question', 'Project', 'Material', 'User'] })
    relatedModel: string;

    @Prop({ default: true })
    isPublic: boolean;
}

export const FileSchema = SchemaFactory.createForClass(File); 