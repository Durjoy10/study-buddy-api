import { Document } from 'mongoose';
export type PaperDocument = Paper & Document;
export declare class Paper {
    title: string;
    subject: string;
    semester: string;
    email: string;
    filePath: string;
}
export declare const PaperSchema: import("mongoose").Schema<Paper, import("mongoose").Model<Paper, any, any, any, Document<unknown, any, Paper> & Paper & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Paper, Document<unknown, {}, import("mongoose").FlatRecord<Paper>> & import("mongoose").FlatRecord<Paper> & {
    _id: import("mongoose").Types.ObjectId;
}>;
