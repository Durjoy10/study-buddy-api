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
exports.CreateProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Study Buddy Mobile App' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A mobile application for students to collaborate...' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Web Development' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fall 2023' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "semester", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CSE470 - Software Engineering' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2024 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProjectDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['React', 'Node.js', 'MongoDB'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProjectDto.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['web', 'mobile', 'education'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProjectDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/thumbnail.jpg' }),
    (0, class_validator_1.ValidateIf)((o) => o.thumbnailUrl !== undefined && o.thumbnailUrl !== ''),
    (0, class_validator_1.IsUrl)({ protocols: ['http', 'https'], require_protocol: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/project.zip' }),
    (0, class_validator_1.ValidateIf)((o) => o.fileURL !== undefined && o.fileURL !== ''),
    (0, class_validator_1.IsUrl)({ protocols: ['http', 'https'], require_protocol: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "fileURL", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://github.com/username/repo' }),
    (0, class_validator_1.ValidateIf)((o) => o.repositoryUrl !== undefined && o.repositoryUrl !== ''),
    (0, class_validator_1.IsUrl)({ protocols: ['http', 'https'], require_protocol: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "repositoryUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://demo.example.com' }),
    (0, class_validator_1.ValidateIf)((o) => o.demoUrl !== undefined && o.demoUrl !== ''),
    (0, class_validator_1.IsUrl)({ protocols: ['http', 'https'], require_protocol: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "demoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['user456', 'user789'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProjectDto.prototype, "collaborators", void 0);
//# sourceMappingURL=create-project.dto.js.map