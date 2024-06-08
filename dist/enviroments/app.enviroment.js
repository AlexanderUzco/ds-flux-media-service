"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_USER = exports.EMAIL_PASSWORD = exports.EMAIL_PORT = exports.EMAIL_HOST = exports.SALT_ROUNDS_PASSWORD = exports.JWT_SECRET = exports.DB_URI = exports.PORT = void 0;
require("dotenv/config");
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
const DB_URI = process.env.DB_URI || undefined;
exports.DB_URI = DB_URI;
const JWT_SECRET = process.env.JWT_SECRET || undefined;
exports.JWT_SECRET = JWT_SECRET;
const SALT_ROUNDS_PASSWORD = (process.env.SALT_ROUNDS_PASSWORD &&
    parseInt(process.env.SALT_ROUNDS_PASSWORD)) ||
    10;
exports.SALT_ROUNDS_PASSWORD = SALT_ROUNDS_PASSWORD;
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
exports.EMAIL_HOST = EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
exports.EMAIL_PORT = EMAIL_PORT;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
exports.EMAIL_PASSWORD = EMAIL_PASSWORD;
const EMAIL_USER = process.env.EMAIL_USER || '';
exports.EMAIL_USER = EMAIL_USER;
