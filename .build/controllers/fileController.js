"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testStoreMetadata = exports.getFileStatus = exports.downloadFile = exports.uploadFile = void 0;
const fileMetadataRepository_1 = __importDefault(require("../repositories/fileMetadataRepository"));
const fileService_1 = __importDefault(require("../services/fileService"));
const crypto_1 = require("crypto");
async function dynamicImport(modulePath) {
    return await Promise.resolve(`${modulePath}`).then(s => __importStar(require(s)));
}
// Upload File: Handles file upload and encryption
async function uploadFile(req, res, next) {
    // TODO: Implement file upload logic
    res.status(200).send('File upload endpoint');
}
exports.uploadFile = uploadFile;
// Download File: Retrieve and decrypt the file
async function downloadFile(req, res, next) {
    // TODO: Implement file download logic
    res.status(200).send('File download endpoint');
}
exports.downloadFile = downloadFile;
// Get File Status: Check file metadata or status (optional)
async function getFileStatus(req, res, next) {
    // TODO: Implement file status check logic
    res.status(200).send('File status endpoint');
}
exports.getFileStatus = getFileStatus;
async function testStoreMetadata(req, res, next) {
    const fileMetadataRepository = new fileMetadataRepository_1.default();
    const fileService = new fileService_1.default(fileMetadataRepository);
    const nanoid = await dynamicImport('nanoid');
    const metadata = {
        id: nanoid(8),
        filePath: 'test.txt',
        key: (0, crypto_1.randomBytes)(32),
        iv: (0, crypto_1.randomBytes)(16),
        downloadCount: 0,
        maxDownloadCount: 0,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6),
    };
    const result = await fileService.createFileMetadata(metadata);
    res.status(200).send('Request result: ' + result);
}
exports.testStoreMetadata = testStoreMetadata;
//# sourceMappingURL=fileController.js.map