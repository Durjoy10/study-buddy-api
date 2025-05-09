import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, IUser } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<Partial<IUser>[]> {
        const users = await this.userModel.find().exec();
        return users.map(user => {
            const { password, ...result } = user.toObject();
            return result;
        });
    }

    async findOne(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<IUser>> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const { password, ...result } = updatedUser.toObject();
        return result;
    }

    async remove(id: string): Promise<Partial<IUser>> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const { password, ...result } = deletedUser.toObject();
        return result;
    }
} 