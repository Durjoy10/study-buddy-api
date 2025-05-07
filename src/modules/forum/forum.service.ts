import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Comment } from './schemas/comment.schema';
import { Post } from './schemas/post.schema';

@Injectable()
export class ForumService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
    ) { }

    // Post methods
    async createPost(createPostDto: CreatePostDto, userId: Types.ObjectId): Promise<Post> {
        const post = new this.postModel({
            ...createPostDto,
            author: userId,
        });
        return post.save();
    }

    async findAllPosts(): Promise<Post[]> {
        return this.postModel.find()
            .populate('author', 'name email profilePicture')
            .sort({ createdAt: -1 })
            .exec();
    }

    async findPostById(id: string): Promise<Post> {
        const post = await this.postModel.findById(id)
            .populate('author', 'name email profilePicture')
            .exec();
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        // Increment views
        post.views += 1;
        await post.save();
        return post;
    }

    async updatePost(id: string, updateData: Partial<CreatePostDto>): Promise<Post> {
        const post = await this.postModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).exec();
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    async deletePost(id: string): Promise<void> {
        const result = await this.postModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Post not found');
        }
        // Delete all comments associated with the post
        await this.commentModel.deleteMany({ post: id }).exec();
    }

    async toggleLike(postId: string, userId: Types.ObjectId): Promise<Post> {
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const likeIndex = post.likes.indexOf(userId);
        if (likeIndex === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(likeIndex, 1);
        }

        return post.save();
    }

    // Comment methods
    async createComment(createCommentDto: CreateCommentDto, userId: Types.ObjectId): Promise<Comment> {
        const comment = new this.commentModel({
            ...createCommentDto,
            author: userId,
        });
        const savedComment = await comment.save();

        // Update post's comment count
        await this.postModel.findByIdAndUpdate(
            createCommentDto.post,
            { $inc: { commentsCount: 1 } }
        ).exec();

        return savedComment;
    }

    async findCommentsByPost(postId: string): Promise<Comment[]> {
        return this.commentModel.find({ post: postId })
            .populate('author', 'name email profilePicture')
            .populate('parentComment')
            .sort({ createdAt: 1 })
            .exec();
    }

    async updateComment(id: string, content: string): Promise<Comment> {
        const comment = await this.commentModel.findByIdAndUpdate(
            id,
            { $set: { content } },
            { new: true }
        ).exec();
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        return comment;
    }

    async deleteComment(id: string): Promise<void> {
        const comment = await this.commentModel.findById(id);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        // Update post's comment count
        await this.postModel.findByIdAndUpdate(
            comment.post,
            { $inc: { commentsCount: -1 } }
        ).exec();

        await this.commentModel.deleteOne({ _id: id }).exec();
    }

    async toggleCommentLike(commentId: string, userId: Types.ObjectId): Promise<Comment> {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        const likeIndex = comment.likes.indexOf(userId);
        if (likeIndex === -1) {
            comment.likes.push(userId);
        } else {
            comment.likes.splice(likeIndex, 1);
        }

        return comment.save();
    }

    async markCommentAsAnswer(commentId: string): Promise<{ comment: Comment; post: Post }> {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        comment.isAnswer = true;
        await comment.save();

        const post = await this.postModel.findByIdAndUpdate(
            comment.post,
            { isAnswered: true },
            { new: true }
        ).exec();

        return { comment, post };
    }
} 