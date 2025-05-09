import { Model, Types } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Comment } from './schemas/comment.schema';
import { Post } from './schemas/post.schema';
export declare class ForumService {
    private postModel;
    private commentModel;
    constructor(postModel: Model<Post>, commentModel: Model<Comment>);
    createPost(createPostDto: CreatePostDto, userId: Types.ObjectId): Promise<Post>;
    findAllPosts(): Promise<Post[]>;
    findPostById(id: string): Promise<Post>;
    updatePost(id: string, updateData: Partial<CreatePostDto>): Promise<Post>;
    deletePost(id: string): Promise<void>;
    toggleLike(postId: string, userId: Types.ObjectId): Promise<Post>;
    createComment(createCommentDto: CreateCommentDto, userId: Types.ObjectId): Promise<Comment>;
    findCommentsByPost(postId: string): Promise<Comment[]>;
    updateComment(id: string, content: string): Promise<Comment>;
    deleteComment(id: string): Promise<void>;
    toggleCommentLike(commentId: string, userId: Types.ObjectId): Promise<Comment>;
    markCommentAsAnswer(commentId: string): Promise<{
        comment: Comment;
        post: Post;
    }>;
    getForumStats(): Promise<{
        totalPosts: number;
        totalComments: number;
        totalViews: number;
    }>;
}
