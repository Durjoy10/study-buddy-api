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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperSchema = exports.Paper = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Paper = class Paper {
};
exports.Paper = Paper;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "semester", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "filePath", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: {
            name: { type: String, required: true },
            email: { type: String, required: true }
        }
    }),
    __metadata("design:type", Object)
], Paper.prototype, "uploadedBy", void 0);
exports.Paper = Paper = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Paper);
exports.PaperSchema = mongoose_1.SchemaFactory.createForClass(Paper);
//# sourceMappingURL=paper.schema.js.map