import { Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';
export declare class UploadsService {
    private fileModel;
    constructor(fileModel: Model<FileDocument>);
    create(fileData: Partial<File>): Promise<File>;
    findById(id: string): Promise<File>;
    findByUser(userId: string): Promise<File[]>;
    delete(id: string): Promise<File>;
}
