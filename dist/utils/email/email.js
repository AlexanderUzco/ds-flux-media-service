"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const app_enviroment_1 = require("../../enviroments/app.enviroment");
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: app_enviroment_1.EMAIL_USER,
        pass: app_enviroment_1.EMAIL_PASSWORD,
    },
});
exports.transporter = transporter;
