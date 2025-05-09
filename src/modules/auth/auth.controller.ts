import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: any) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body);
    }

    @Get('me')
    async getCurrentUser(@Request() req) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return { error: 'No token provided' };
        }
        return this.authService.getCurrentUser(token);
    }
} 