import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    course: string;

    @Prop({ required: true })
    year: number;

    @Prop({ enum: ['Spring', 'Summer', 'Fall'], required: true })
    semester: string;

    @Prop({ enum: ['Mid', 'Final', 'Quiz'], required: true })
    examType: string;

    @Prop({ required: true })
    department: string;

    @Prop({ required: true })
    fileUrl: string;

    @Prop()
    thumbnailUrl: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    uploadedBy: Types.ObjectId;

    @Prop({ default: 0 })
    downloads: number;

    @Prop([String])
    tags: string[];

    @Prop()
    description: string;

    @Prop({ default: false })
    isApproved: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question); 