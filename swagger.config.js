"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwaggerDocs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || '4500');
const HOST = process.env.HOST || 'http://localhost';
const SERVER_URL = `${HOST}:${PORT}`;
// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Weather Info API',
            version: '1.0.0',
            description: 'A simple API description for using OpenWeatherMap',
        },
        servers: [
            {
                url: SERVER_URL,
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/docs/*.ts'], // Path to the route files
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Function to set up Swagger
const setupSwaggerDocs = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log(`Swagger docs available at ds ${SERVER_URL}/api-docs`);
};
exports.setupSwaggerDocs = setupSwaggerDocs;
