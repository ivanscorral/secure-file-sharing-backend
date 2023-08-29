"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("crypto");
require('dotenv').config({ path: __dirname + '/.env' });
// Needed for mocking purposes
const fileMetadataRepository_1 = __importDefault(require("./repositories/fileMetadataRepository"));
const fileService_1 = __importDefault(require("./services/fileService"));
// Create the mock objects to test the fileService
const fileService = new fileService_1.default(new fileMetadataRepository_1.default());
// Constants
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secure-file-sharing';
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
app.use('/api/files', fileRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
async function encryptionDemo(buffer) {
    // High-resolution timing
    const start = process.hrtime.bigint();
    const encryptedCfg = await fileService.encrypt(buffer);
    const end = process.hrtime.bigint();
    console.log(`Time taken: ${(end - start) / 1000000n} ms to encrypt with size ${buffer.length}`);
    console.log(encryptedCfg);
    // Decryption code commented out
}
/**
 * Generates a random buffer of the specified length.
 *
 * @param {number} length - The length of the buffer to be generated.
 * @return {Buffer} - A buffer containing random bytes.
 */
function createRandomBuffer(length) {
    return (0, crypto_1.randomBytes)(length);
}
// Execute the function with 1MB of buffer
encryptionDemo(createRandomBuffer(1024 * 1024 * 500)).catch((err) => {
    console.error('An error occurred:', err);
});
if (!process.env.DISABLE_DB) {
    console.log('Connecting to MongoDB...');
    mongoose_1.default
        .connect(MONGO_URI)
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((err) => {
        console.error('An error occurred connecting to mongoDB:', err);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map