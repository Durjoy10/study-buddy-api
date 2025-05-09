"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        try {
            const user = await this.usersService.findByEmail(email);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return null;
            }
            const { password: _, ...result } = user.toObject();
            return result;
        }
        catch (error) {
            return null;
        }
    }
    async register(data) {
        try {
            const existingUser = await this.usersService.findByEmail(data.email).catch(() => null);
            if (existingUser) {
                throw new common_1.UnauthorizedException('User already exists');
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.usersService.create({
                ...data,
                password: hashedPassword,
            });
            const token = this.jwtService.sign({
                email: user.email,
                name: user.name,
                sub: user._id
            });
            const { password, ...result } = user.toObject();
            return {
                user: result,
                access_token: token
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async login(data) {
        try {
            const user = await this.usersService.findByEmail(data.email);
            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const token = this.jwtService.sign({
                email: user.email,
                name: user.name,
                sub: user._id
            });
            const { password, ...result } = user.toObject();
            return {
                user: result,
                access_token: token
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
    async getCurrentUser(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.usersService.findOne(payload.sub);
            const { password, ...result } = user.toObject();
            return result;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map