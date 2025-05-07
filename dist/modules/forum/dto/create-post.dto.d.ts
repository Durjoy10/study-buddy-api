export declare enum PostCategory {
    General = "General",
    Question = "Question",
    Discussion = "Discussion",
    Announcement = "Announcement"
}
export declare class CreatePostDto {
    title: string;
    content: string;
    category: PostCategory;
    tags?: string[];
}
