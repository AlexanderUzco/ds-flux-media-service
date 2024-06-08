"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = __importDefault(require("./config/mongo"));
const index_1 = require("./routes/index");
const app_enviroment_1 = require("./enviroments/app.enviroment");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
// Middlewares
app.use(error_middleware_1.errorHandler);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(index_1.router);
// Connect to database
(0, mongo_1.default)();
// Start server
app.listen(app_enviroment_1.PORT, () => console.log(`Server running on port ${app_enviroment_1.PORT}`));
