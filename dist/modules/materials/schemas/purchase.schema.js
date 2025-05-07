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
exports.PurchaseSchema = exports.Purchase = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Purchase = class Purchase {
};
exports.Purchase = Purchase;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Material', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Purchase.prototype, "material", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Purchase.prototype, "buyer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Purchase.prototype, "seller", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Purchase.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Bkash', 'Nagad', 'Rocket', 'Card'], required: true }),
    __metadata("design:type", String)
], Purchase.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Purchase.prototype, "transactionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' }),
    __metadata("design:type", String)
], Purchase.prototype, "status", void 0);
exports.Purchase = Purchase = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Purchase);
exports.PurchaseSchema = mongoose_1.SchemaFactory.createForClass(Purchase);
//# sourceMappingURL=purchase.schema.js.map