import { Response } from 'express';
import { CreatePaperDto } from './dto/create-paper.dto';
import { PapersService } from './papers.service';
export declare class PapersController {
    private readonly papersService;
    constructor(papersService: PapersService);
    uploadPaper(file: Express.Multer.File, createPaperDto: CreatePaperDto): Promise<import("./schemas/paper.schema").Paper>;
    findAll(): Promise<import("./schemas/paper.schema").Paper[]>;
    findOne(id: string): Promise<import("./schemas/paper.schema").Paper>;
    downloadPaper(id: string, res: Response): Promise<void>;
}
