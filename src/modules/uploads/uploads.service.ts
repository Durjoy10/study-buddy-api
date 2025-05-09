import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';

@Injectable()
export class UploadsService {
    constructor(
        @InjectModel(File.name) private fileModel: Model<FileDocument>,
    ) { }

    async create(fileData: Partial<File>): Promise<File> {
        const createdFile = new this.fileModel(fileData);
        return createdFile.save();
    }

    async findById(id: string): Promise<File> {
        return this.fileModel.findById(id).exec();
    }

    async findByUser(userId: string): Promise<File[]> {
        return this.fileModel.find({ uploadedBy: userId }).exec();
    }

    async delete(id: string): Promise<File> {
        return this.fileModel.findByIdAndDelete(id).exec();
    }
} 