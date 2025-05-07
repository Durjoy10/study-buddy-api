import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ForumService } from './forum.service';
export declare class ForumController {
    private readonly forumService;
    constructor(forumService: ForumService);
    createPost(createPostDto: CreatePostDto, req: any): Promise<import("./schemas/post.schema").Post>;
    findAllPosts(): Promise<import("./schemas/post.schema").Post[]>;
    findPostById(id: string): Promise<import("./schemas/post.schema").Post>;
    updatePost(id: string, updateData: Partial<CreatePostDto>): Promise<import("./schemas/post.schema").Post>;
    deletePost(id: string): Promise<void>;
    togglePostLike(id: string, req: any): Promise<import("./schemas/post.schema").Post>;
    createComment(createCommentDto: CreateCommentDto, req: any): Promise<import("./schemas/comment.schema").Comment>;
    findCommentsByPost(postId: string): Promise<import("./schemas/comment.schema").Comment[]>;
    updateComment(id: string, content: string): Promise<import("./schemas/comment.schema").Comment>;
    deleteComment(id: string): Promise<void>;
    toggleCommentLike(id: string, req: any): Promise<import("./schemas/comment.schema").Comment>;
    markCommentAsAnswer(id: string): Promise<{
        comment: import("./schemas/comment.schema").Comment;
        post: import("./schemas/post.schema").Post;
    }>;
}
