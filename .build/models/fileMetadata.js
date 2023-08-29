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
exports.FileMetadata = exports.FileMetadataModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
// Generate a random string
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
// Hooks
let FileMetadata = class FileMetadata {
};
exports.FileMetadata = FileMetadata;
__decorate([
    (0, typegoose_1.prop)({ required: false, unique: true, index: true, default: () => generateRandomString(10) }),
    __metadata("design:type", String)
], FileMetadata.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], FileMetadata.prototype, "filePath", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Buffer)
], FileMetadata.prototype, "key", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Buffer)
], FileMetadata.prototype, "iv", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], FileMetadata.prototype, "expiresAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], FileMetadata.prototype, "downloadCount", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], FileMetadata.prototype, "maxDownloadCount", void 0);
exports.FileMetadata = FileMetadata = __decorate([
    (0, typegoose_1.pre)('save', function (next) {
        if (this.isNew) {
            if (!this.expiresAt) {
                this.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
            }
            if (!this.id) {
                this.id = generateRandomString(10);
            }
        }
        next();
    }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { timestamps: true } })
], FileMetadata);
const FileMetadataModel = (0, typegoose_1.getModelForClass)(FileMetadata);
exports.FileMetadataModel = FileMetadataModel;
//# sourceMappingURL=fileMetadata.js.map