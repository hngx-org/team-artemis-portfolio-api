"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var options = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            title: "Zuri Portfolio End Point Documentation",
            version: "1.0.0",
            description: "API for Zuri Portfolio End Point Documentation",
        },
    },
    apis: ["./src/routes/*.route.ts"],
};
var specs = (0, swagger_jsdoc_1.default)(options);
module.exports = specs;
//# sourceMappingURL=swagger.js.map