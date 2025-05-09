import { Types } from 'mongoose';
export declare class CreateProjectDto {
    title: string;
    description: string;
    category: string;
    semester: string;
    course: string;
    year: number;
    createdBy?: Types.ObjectId;
    technologies?: string[];
    tags?: string[];
    thumbnailUrl?: string;
    fileURL?: string;
    repositoryUrl?: string;
    demoUrl?: string;
    collaborators?: Types.ObjectId[];
}
