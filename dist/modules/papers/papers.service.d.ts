import { Model } from 'mongoose';
import { CreatePaperDto } from './dto/create-paper.dto';
import { Paper, PaperDocument } from './schemas/paper.schema';
export declare class PapersService {
    private paperModel;
    constructor(paperModel: Model<PaperDocument>);
    create(createPaperDto: CreatePaperDto, filePath: string): Promise<Paper>;
    findAll(): Promise<Paper[]>;
    findOne(id: string): Promise<Paper>;
}
