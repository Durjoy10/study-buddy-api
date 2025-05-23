import { Document, Types } from 'mongoose';
export interface IUser {
    email: string;
    password: string;
    name: string;
    profilePicture: string;
    role: string;
    department: string;
    studentId: string;
    isEmailVerified: boolean;
    lastLogin: Date;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    _id: Types.ObjectId;
}
export declare class User {
    email: string;
    password: string;
    name: string;
    profilePicture: string;
    role: string;
    department: string;
    studentId: string;
    isEmailVerified: boolean;
    lastLogin: Date;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}
export type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
