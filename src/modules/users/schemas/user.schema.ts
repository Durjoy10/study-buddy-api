import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    profilePicture: string;

    @Prop({ enum: ['student', 'teacher', 'admin'], default: 'student' })
    role: string;

    @Prop()
    department: string;

    @Prop({ unique: true, sparse: true })
    studentId: string;

    @Prop({ default: false })
    isEmailVerified: boolean;

    @Prop()
    lastLogin: Date;

    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpires: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User); 