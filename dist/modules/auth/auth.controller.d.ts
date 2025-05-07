import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    login(req: any, loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
