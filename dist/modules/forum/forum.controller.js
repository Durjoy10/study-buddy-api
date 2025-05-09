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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const create_post_dto_1 = require("./dto/create-post.dto");
const forum_service_1 = require("./forum.service");
const mongoose_1 = require("mongoose");
let ForumController = class ForumController {
    constructor(forumService) {
        this.forumService = forumService;
    }
    async createPost(createPostDto) {
        return this.forumService.createPost(createPostDto, new mongoose_1.Types.ObjectId("000000000000000000000000"));
    }
    async findAllPosts() {
        return this.forumService.findAllPosts();
    }
    async findPostById(id) {
        return this.forumService.findPostById(id);
    }
    async updatePost(id, updateData) {
        return this.forumService.updatePost(id, updateData);
    }
    async deletePost(id) {
        return this.forumService.deletePost(id);
    }
    async togglePostLike(id, req) {
        return this.forumService.toggleLike(id, req.user._id);
    }
    async createComment(createCommentDto) {
        const defaultAuthorId = new mongoose_1.Types.ObjectId('000000000000000000000000');
        return this.forumService.createComment(createCommentDto, defaultAuthorId);
    }
    async findCommentsByPost(postId) {
        return this.forumService.findCommentsByPost(postId);
    }
    async updateComment(id, content) {
        return this.forumService.updateComment(id, content);
    }
    async deleteComment(id) {
        return this.forumService.deleteComment(id);
    }
    async toggleCommentLike(id, req) {
        return this.forumService.toggleCommentLike(id, req.user._id);
    }
    async markCommentAsAnswer(id) {
        return this.forumService.markCommentAsAnswer(id);
    }
    async getForumStats() {
        return this.forumService.getForumStats();
    }
};
exports.ForumController = ForumController;
__decorate([
    (0, common_1.Post)('posts'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('posts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "findAllPosts", null);
__decorate([
    (0, common_1.Get)('posts/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a post by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "findPostById", null);
__decorate([
    (0, common_1.Patch)('posts/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a post' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('posts/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a post' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('posts/:id/like'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle like on a post' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "togglePostLike", null);
__decorate([
    (0, common_1.Post)('comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new comment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)('posts/:postId/comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all comments for a post' }),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "findCommentsByPost", null);
__decorate([
    (0, common_1.Patch)('comments/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a comment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('comments/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a comment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Post)('comments/:id/like'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle like on a comment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "toggleCommentLike", null);
__decorate([
    (0, common_1.Post)('comments/:id/answer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a comment as an answer' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "markCommentAsAnswer", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get forum statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getForumStats", null);
exports.ForumController = ForumController = __decorate([
    (0, swagger_1.ApiTags)('forum'),
    (0, common_1.Controller)('forum'),
    __metadata("design:paramtypes", [forum_service_1.ForumService])
], ForumController);
//# sourceMappingURL=forum.controller.js.map