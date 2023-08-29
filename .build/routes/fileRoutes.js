"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileController_1 = require("../controllers/fileController");
const router = express_1.default.Router();
// Upload Endpoint: Handle file upload and encryption
router.post('/upload', fileController_1.uploadFile);
// Download Endpoint: Retrieve and decrypt the file
router.get('/download/:id', fileController_1.downloadFile);
// Optional: Status Endpoint to check file metadata or status
router.get('/status/:id', fileController_1.getFileStatus);
router.get('/testStoreMetadata', fileController_1.testStoreMetadata);
exports.default = router;
//# sourceMappingURL=fileRoutes.js.map