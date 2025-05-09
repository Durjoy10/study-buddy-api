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
exports.PapersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const paper_schema_1 = require("./schemas/paper.schema");
let PapersService = class PapersService {
    constructor(paperModel) {
        this.paperModel = paperModel;
    }
    async create(createPaperDto, filePath) {
        const createdPaper = new this.paperModel({
            ...createPaperDto,
            filePath,
            uploadedBy: {
                name: createPaperDto.name,
                email: createPaperDto.email
            }
        });
        return createdPaper.save();
    }
    async findAll() {
        return this.paperModel.find().exec();
    }
    async findOne(id) {
        return this.paperModel.findById(id).exec();
    }
};
exports.PapersService = PapersService;
exports.PapersService = PapersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(paper_schema_1.Paper.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PapersService);
//# sourceMappingURL=papers.service.js.map