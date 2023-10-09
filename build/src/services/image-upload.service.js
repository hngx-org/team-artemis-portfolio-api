"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryService = void 0;
var path = require("path");
var cloudinary = require("cloudinary");
var DataUri = require("datauri/parser");
// const {
//   ListObjectsV2Command,
//   S3Client,
//   GetObjectCommand,
//   PutObjectCommand,
// } = require("@aws-sdk/client-s3");
// const fetchConfig = {
//   credentials: {
//     accessKeyId: "",
//     secretAccessKey: "",
//   },
//   region: "",
// };
// const s3 = new S3Client(fetchConfig);
var cloudinaryService = function (files, service) { return __awaiter(void 0, void 0, void 0, function () {
    var urls, dtauri, _i, files_1, file, dataUri, final_file, image, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                cloudinary.config({
                    cloud_name: "ol4juwon",
                    api_key: "619781942963636",
                    api_secret: "8ZuIWrywiz5m6_6mLq_AYuHDeUo",
                });
                urls = [];
                dtauri = new DataUri();
                _i = 0, files_1 = files;
                _a.label = 1;
            case 1:
                if (!(_i < files_1.length)) return [3 /*break*/, 4];
                file = files_1[_i];
                dataUri = dtauri.format(path.extname(file.originalname), file.buffer);
                final_file = dataUri.content;
                return [4 /*yield*/, cloudinary.v2.uploader.upload_large(final_file)];
            case 2:
                image = _a.sent();
                urls.push(image.secure_url);
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(urls);
                return [2 /*return*/, { successful: true, message: "files uploaded successfully", urls: urls }];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, { successful: false, message: error_1.message, urls: [] }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.cloudinaryService = cloudinaryService;
// export const AWSService = async (
//   files: any,
//   service: any
// ): Promise<{ successful: boolean; message: string; urls: any[] }> => {
//   try {
//     const urls = [];
//     const dtauri = new DataUri();
//     for (const file of files) {
//       const putCommand = new PutObjectCommand({
//         Bucket: "bucketName",
//         Key: file.originalname,
//         Body: file.buffer,
//       });
//       const img = await s3.send(putCommand);
//       urls.push(img.secure_url);
//     }
//     return { successful: true, message: "files uploaded successfully", urls };
//   } catch (error) {
//     return { successful: false, message: (error as Error).message, urls: [] };
//   }
// };
//# sourceMappingURL=image-upload.service.js.map