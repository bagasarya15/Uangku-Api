"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinaryConfig = () => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
};
exports.cloudinaryConfig = cloudinaryConfig;
//# sourceMappingURL=cloudinary.js.map