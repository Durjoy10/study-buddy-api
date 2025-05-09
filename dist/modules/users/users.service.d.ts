import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, IUser } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findAll(): Promise<Partial<IUser>[]>;
    findOne(id: string): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<IUser>>;
    remove(id: string): Promise<Partial<IUser>>;
}
