import { Document, Types } from 'mongoose';
export type ProjectDocument = Project & Document;
export declare class Project {
    title: string;
    description: string;
    category: string;
    semester: string;
    course: string;
    year: number;
    createdBy: Types.ObjectId;
    technologies: string[];
    tags: string[];
    thumbnailUrl: string;
    fileURL: string;
    repositoryUrl: string;
    demoUrl: string;
    collaborators: Types.ObjectId[];
    likes: Types.ObjectId[];
    views: number;
}
export declare const ProjectSchema: import("mongoose").Schema<Project, import("mongoose").Model<Project, any, any, any, Document<unknown, any, Project> & Project & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Project, Document<unknown, {}, import("mongoose").FlatRecord<Project>> & import("mongoose").FlatRecord<Project> & {
    _id: Types.ObjectId;
}>;
