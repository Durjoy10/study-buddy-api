import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ForumService } from './forum.service';
import { Types } from 'mongoose';

@ApiTags('forum')
@Controller('forum')
export class ForumController {
    constructor(private readonly forumService: ForumService) { }

    // Post endpoints
    @Post('posts')
    // @UseGuards(JwtAuthGuard) // Removed for open posting
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'Post created successfully' })
    async createPost(@Body() createPostDto: CreatePostDto) {
        // Pass the dummy author ObjectId as the second argument
        return this.forumService.createPost(createPostDto, new Types.ObjectId("000000000000000000000000"));
    }

    @Get('posts')
    @ApiOperation({ summary: 'Get all posts' })
    async findAllPosts() {
        return this.forumService.findAllPosts();
    }

    @Get('posts/:id')
    @ApiOperation({ summary: 'Get a post by ID' })
    async findPostById(@Param('id') id: string) {
        return this.forumService.findPostById(id);
    }

    @Patch('posts/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a post' })
    async updatePost(
        @Param('id') id: string,
        @Body() updateData: Partial<CreatePostDto>,
    ) {
        return this.forumService.updatePost(id, updateData);
    }

    @Delete('posts/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Delete a post' })
    async deletePost(@Param('id') id: string) {
        return this.forumService.deletePost(id);
    }

    @Post('posts/:id/like')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Toggle like on a post' })
    async togglePostLike(@Param('id') id: string, @Request() req) {
        return this.forumService.toggleLike(id, req.user._id);
    }

    // Comment endpoints
    @Post('comments')
    @ApiOperation({ summary: 'Create a new comment' })
    async createComment(@Body() createCommentDto: CreateCommentDto) {
        // Use a default author ID for anonymous comments
        const defaultAuthorId = new Types.ObjectId('000000000000000000000000');
        return this.forumService.createComment(createCommentDto, defaultAuthorId);
    }

    @Get('posts/:postId/comments')
    @ApiOperation({ summary: 'Get all comments for a post' })
    async findCommentsByPost(@Param('postId') postId: string) {
        return this.forumService.findCommentsByPost(postId);
    }

    @Patch('comments/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a comment' })
    async updateComment(
        @Param('id') id: string,
        @Body('content') content: string,
    ) {
        return this.forumService.updateComment(id, content);
    }

    @Delete('comments/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a comment' })
    async deleteComment(@Param('id') id: string) {
        return this.forumService.deleteComment(id);
    }

    @Post('comments/:id/like')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Toggle like on a comment' })
    async toggleCommentLike(@Param('id') id: string, @Request() req) {
        return this.forumService.toggleCommentLike(id, req.user._id);
    }

    @Post('comments/:id/answer')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Mark a comment as an answer' })
    async markCommentAsAnswer(@Param('id') id: string) {
        return this.forumService.markCommentAsAnswer(id);
    }

    @Get('stats')
    @ApiOperation({ summary: 'Get forum statistics' })
    async getForumStats() {
        return this.forumService.getForumStats();
    }
} 