"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const forum_module_1 = require("./modules/forum/forum.module");
const materials_module_1 = require("./modules/materials/materials.module");
const papers_module_1 = require("./modules/papers/papers.module");
const projects_module_1 = require("./modules/projects/projects.module");
const questions_module_1 = require("./modules/questions/questions.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const users_module_1 = require("./modules/users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://durjoy1514135:123456qwE@ecom.wbhww.mongodb.net/studybuddy'),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            questions_module_1.QuestionsModule,
            projects_module_1.ProjectsModule,
            materials_module_1.MaterialsModule,
            forum_module_1.ForumModule,
            uploads_module_1.UploadsModule,
            papers_module_1.PapersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map