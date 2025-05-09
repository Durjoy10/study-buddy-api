import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.usersService.findByEmail(email);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return null;
            }
            
            const { password: _, ...result } = user.toObject();
            return result;
        } catch (error) {
            return null;
        }
    }

    async register(data: any) {
        try {
            // Check if user exists
            const existingUser = await this.usersService.findByEmail(data.email).catch(() => null);
            if (existingUser) {
                throw new UnauthorizedException('User already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(data.password, 10);
            
            // Create user
            const user = await this.usersService.create({
                ...data,
                password: hashedPassword,
            });

            // Generate token
            const token = this.jwtService.sign({ 
                email: user.email, 
                name: user.name,
                sub: user._id 
            });

            // Return user data and token
            const { password, ...result } = user.toObject();
            return {
                user: result,
                access_token: token
            };
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    async login(data: any) {
        try {
            // Find user
            const user = await this.usersService.findByEmail(data.email);
            
            // Verify password
            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            // Generate token
            const token = this.jwtService.sign({ 
                email: user.email, 
                name: user.name,
                sub: user._id 
            });

            // Return user data and token
            const { password, ...result } = user.toObject();
            return {
                user: result,
                access_token: token
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async getCurrentUser(token: string) {
        try {
            // Verify token
            const payload = this.jwtService.verify(token);
            
            // Get user data
            const user = await this.usersService.findOne(payload.sub);
            
            // Return user data without password
            const { password, ...result } = user.toObject();
            return result;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
} 