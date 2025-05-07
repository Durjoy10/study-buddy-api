export declare enum MaterialType {
    Notes = "Notes",
    Book = "Book",
    Slides = "Slides",
    Assignment = "Assignment",
    Other = "Other"
}
export declare class CreateMaterialDto {
    title: string;
    description: string;
    course: string;
    type: MaterialType;
    fileUrl: string;
    thumbnailUrl?: string;
    price: number;
    department: string;
    semester?: string;
    year?: number;
    tags?: string[];
    isApproved?: boolean;
}
