import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadFile(file: Express.Multer.File, req: any): Promise<{
        message: string;
        data: any;
    }>;
}
