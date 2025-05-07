import { Document, Types } from 'mongoose';
import { PostCategory } from '../dto/create-post.dto';
export declare class Post extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
    likes: Types.ObjectId[];
    commentsCount: number;
    views: number;
    category: PostCategory;
    tags: string[];
    isAnswered: boolean;
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, Document<unknown, any, Post> & Post & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, Document<unknown, {}, import("mongoose").FlatRecord<Post>> & import("mongoose").FlatRecord<Post> & {
    _id: Types.ObjectId;
}>;
