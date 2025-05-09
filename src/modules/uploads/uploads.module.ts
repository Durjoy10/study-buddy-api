import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { File, FileSchema } from './schemas/file.schema';
import * as fs from 'fs';
import * as path from 'path';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    ],
    controllers: [UploadsController],
    providers: [UploadsService],
    exports: [UploadsService],
})
export class UploadsModule implements OnModuleInit {
    onModuleInit() {
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
    }
} 