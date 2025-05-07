import { Document, Types } from 'mongoose';
export type QuestionDocument = Question & Document;
export declare class Question {
    title: string;
    course: string;
    year: number;
    semester: string;
    examType: string;
    department: string;
    fileUrl: string;
    thumbnailUrl: string;
    uploadedBy: Types.ObjectId;
    downloads: number;
    tags: string[];
    description: string;
    isApproved: boolean;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, Document<unknown, any, Question> & Question & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, Document<unknown, {}, import("mongoose").FlatRecord<Question>> & import("mongoose").FlatRecord<Question> & {
    _id: Types.ObjectId;
}>;
