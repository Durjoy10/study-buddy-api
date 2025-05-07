"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const forum_controller_1 = require("./forum.controller");
const forum_service_1 = require("./forum.service");
const comment_schema_1 = require("./schemas/comment.schema");
const post_schema_1 = require("./schemas/post.schema");
let ForumModule = class ForumModule {
};
exports.ForumModule = ForumModule;
exports.ForumModule = ForumModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: post_schema_1.Post.name, schema: post_schema_1.PostSchema },
                { name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema },
            ]),
        ],
        controllers: [forum_controller_1.ForumController],
        providers: [forum_service_1.ForumService],
        exports: [forum_service_1.ForumService],
    })
], ForumModule);
//# sourceMappingURL=forum.module.js.map