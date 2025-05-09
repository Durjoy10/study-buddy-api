import { Types } from 'mongoose';
export declare class UpdateProjectDto {
    title?: string;
    description?: string;
    category?: string;
    semester?: string;
    course?: string;
    year?: number;
    technologies?: string[];
    tags?: string[];
    thumbnailUrl?: string;
    fileURL?: string;
    repositoryUrl?: string;
    demoUrl?: string;
    collaborators?: Types.ObjectId[];
}
