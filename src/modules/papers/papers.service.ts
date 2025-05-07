import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaperDto } from './dto/create-paper.dto';
import { Paper, PaperDocument } from './schemas/paper.schema';

@Injectable()
export class PapersService {
    constructor(
        @InjectModel(Paper.name) private paperModel: Model<PaperDocument>,
    ) { }

    async create(createPaperDto: CreatePaperDto, filePath: string): Promise<Paper> {
        const createdPaper = new this.paperModel({
            ...createPaperDto,
            filePath,
        });
        return createdPaper.save();
    }

    async findAll(): Promise<Paper[]> {
        return this.paperModel.find().exec();
    }

    async findOne(id: string): Promise<Paper> {
        return this.paperModel.findById(id).exec();
    }
} 