import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    register(data: any): Promise<{
        user: any;
        access_token: string;
    }>;
    login(data: any): Promise<{
        user: any;
        access_token: string;
    }>;
    getCurrentUser(token: string): Promise<any>;
}
