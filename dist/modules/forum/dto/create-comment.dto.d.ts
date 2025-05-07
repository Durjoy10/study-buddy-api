import { Types } from 'mongoose';
export declare class CreateCommentDto {
    content: string;
    post: Types.ObjectId;
    isAnswer?: boolean;
    parentComment?: Types.ObjectId;
}
