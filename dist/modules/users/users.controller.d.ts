import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: any): Promise<import("./schemas/user.schema").UserDocument>;
    findAll(): Promise<Partial<import("./schemas/user.schema").IUser>[]>;
    findOne(id: string): Promise<import("./schemas/user.schema").UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<import("./schemas/user.schema").IUser>>;
    remove(id: string): Promise<Partial<import("./schemas/user.schema").IUser>>;
}
