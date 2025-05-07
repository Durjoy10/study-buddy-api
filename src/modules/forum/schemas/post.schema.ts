import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PostCategory } from '../dto/create-post.dto';

@Schema({ timestamps: true })
export class Post extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    author: Types.ObjectId;

    @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
    likes: Types.ObjectId[];

    @Prop({ default: 0 })
    commentsCount: number;

    @Prop({ default: 0 })
    views: number;

    @Prop({ required: true, enum: PostCategory })
    category: PostCategory;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ default: false })
    isAnswered: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post); 