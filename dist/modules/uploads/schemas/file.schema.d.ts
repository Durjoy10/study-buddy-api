import { Document, Types } from 'mongoose';
export type FileDocument = File & Document;
export declare class File {
    filename: string;
    originalName: string;
    mimetype: string;
    size: number;
    url: string;
    uploadedBy: Types.ObjectId;
    relatedTo: Types.ObjectId;
    relatedModel: string;
    isPublic: boolean;
}
export declare const FileSchema: import("mongoose").Schema<File, import("mongoose").Model<File, any, any, any, Document<unknown, any, File> & File & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, File, Document<unknown, {}, import("mongoose").FlatRecord<File>> & import("mongoose").FlatRecord<File> & {
    _id: Types.ObjectId;
}>;
