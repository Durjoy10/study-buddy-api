import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './schemas/question.schema';
export declare class QuestionsService {
    private questionModel;
    constructor(questionModel: Model<Question>);
    create(createQuestionDto: CreateQuestionDto): Promise<Question>;
    findAll(): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    remove(id: string): Promise<Question>;
}
