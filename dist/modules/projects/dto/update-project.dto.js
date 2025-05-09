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
exports.UpdateProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateProjectDto {
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Study Buddy Mobile App', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A mobile application for students to collaborate...', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Web Development', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fall 2023', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "semester", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CSE470 - Software Engineering', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2024, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProjectDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['React', 'Node.js', 'MongoDB'], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "technologies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['web', 'mobile', 'education'], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/thumbnail.jpg', required: false }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/project.zip', required: false }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "fileURL", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://github.com/username/repo', required: false }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "repositoryUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://demo.example.com', required: false }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "demoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['user456', 'user789'], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "collaborators", void 0);
//# sourceMappingURL=update-project.dto.js.map