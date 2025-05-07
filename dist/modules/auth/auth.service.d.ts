import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        email: string;
        name: string;
        profilePicture: string;
        role: string;
        department: string;
        studentId: string;
        isEmailVerified: boolean;
        lastLogin: Date;
        resetPasswordToken: string;
        resetPasswordExpires: Date;
    }>;
}
