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
exports.ForumService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const post_schema_1 = require("./schemas/post.schema");
let ForumService = class ForumService {
    constructor(postModel, commentModel) {
        this.postModel = postModel;
        this.commentModel = commentModel;
    }
    async createPost(createPostDto, userId) {
        const post = new this.postModel({
            ...createPostDto,
            author: userId,
        });
        await post.save();
        const populatedPost = await this.postModel.findById(post._id)
            .populate('author', 'name email profilePicture')
            .exec();
        if (!populatedPost.author) {
            populatedPost.author = {
                _id: userId,
                name: "Anonymous",
                email: "anonymous@example.com",
                profilePicture: null
            };
        }
        return populatedPost;
    }
    async findAllPosts() {
        return this.postModel.find()
            .populate('author', 'name email profilePicture')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findPostById(id) {
        const post = await this.postModel.findById(id)
            .populate('author', 'name email profilePicture')
            .exec();
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        post.views += 1;
        await post.save();
        return post;
    }
    async updatePost(id, updateData) {
        const post = await this.postModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async deletePost(id) {
        const result = await this.postModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Post not found');
        }
        await this.commentModel.deleteMany({ post: id }).exec();
    }
    async toggleLike(postId, userId) {
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        const likeIndex = post.likes.indexOf(userId);
        if (likeIndex === -1) {
            post.likes.push(userId);
        }
        else {
            post.likes.splice(likeIndex, 1);
        }
        return post.save();
    }
    async createComment(createCommentDto, userId) {
        const comment = new this.commentModel({
            ...createCommentDto,
            author: userId,
        });
        await comment.save();
        await this.postModel.findByIdAndUpdate(createCommentDto.post, { $inc: { commentsCount: 1 } }).exec();
        const populatedComment = await this.commentModel.findById(comment._id)
            .populate('author', 'name email profilePicture')
            .populate('parentComment')
            .exec();
        if (!populatedComment.author) {
            populatedComment.author = {
                _id: userId,
                name: "Anonymous",
                email: "anonymous@example.com",
                profilePicture: null
            };
        }
        return populatedComment;
    }
    async findCommentsByPost(postId) {
        return this.commentModel.find({ post: postId })
            .populate('author', 'name email profilePicture')
            .populate('parentComment')
            .sort({ createdAt: 1 })
            .exec();
    }
    async updateComment(id, content) {
        const comment = await this.commentModel.findByIdAndUpdate(id, { $set: { content } }, { new: true }).exec();
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        return comment;
    }
    async deleteComment(id) {
        const comment = await this.commentModel.findById(id);
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        await this.postModel.findByIdAndUpdate(comment.post, { $inc: { commentsCount: -1 } }).exec();
        await this.commentModel.deleteOne({ _id: id }).exec();
    }
    async toggleCommentLike(commentId, userId) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        const likeIndex = comment.likes.indexOf(userId);
        if (likeIndex === -1) {
            comment.likes.push(userId);
        }
        else {
            comment.likes.splice(likeIndex, 1);
        }
        return comment.save();
    }
    async markCommentAsAnswer(commentId) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        comment.isAnswer = true;
        await comment.save();
        const post = await this.postModel.findByIdAndUpdate(comment.post, { isAnswered: true }, { new: true }).exec();
        return { comment, post };
    }
    async getForumStats() {
        const [totalPosts, totalComments, totalViews] = await Promise.all([
            this.postModel.countDocuments(),
            this.commentModel.countDocuments(),
            this.postModel.aggregate([
                { $group: { _id: null, total: { $sum: "$views" } } }
            ]).then(result => result[0]?.total || 0)
        ]);
        return {
            totalPosts,
            totalComments,
            totalViews
        };
    }
};
exports.ForumService = ForumService;
exports.ForumService = ForumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ForumService);
//# sourceMappingURL=forum.service.js.map