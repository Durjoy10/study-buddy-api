import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    semester: string;

    @Prop({ required: true })
    course: string;

    @Prop({ required: true })
    year: number;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

    @Prop([String])
    technologies: string[];

    @Prop([String])
    tags: string[];

    @Prop()
    thumbnailUrl: string;

    @Prop()
    fileURL: string;

    @Prop()
    repositoryUrl: string;

    @Prop()
    demoUrl: string;

    @Prop([{ type: Types.ObjectId, ref: 'User' }])
    collaborators: Types.ObjectId[];

    @Prop([{ type: Types.ObjectId, ref: 'User' }])
    likes: Types.ObjectId[];

    @Prop({ default: 0 })
    views: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project); 