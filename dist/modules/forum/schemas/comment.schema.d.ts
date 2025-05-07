import { Document, Types } from 'mongoose';
export declare class Comment extends Document {
    post: Types.ObjectId;
    content: string;
    author: Types.ObjectId;
    likes: Types.ObjectId[];
    isAnswer: boolean;
    parentComment: Types.ObjectId;
}
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, Document<unknown, any, Comment> & Comment & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, Document<unknown, {}, import("mongoose").FlatRecord<Comment>> & import("mongoose").FlatRecord<Comment> & {
    _id: Types.ObjectId;
}>;
