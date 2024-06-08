"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_enviroment_1 = require("../enviroments/app.enviroment");
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof AuthenticationError) {
        res.status(401).json({ message: 'Unauthorized: ' + err.message });
    }
    else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const generateToken = (res, userId) => {
    if (!app_enviroment_1.JWT_SECRET)
        throw new Error('Error in generateToken');
    const jwtSecret = app_enviroment_1.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret, {
        // expiresIn: 1 day
        expiresIn: '1d',
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
    });
    return token;
};
exports.generateToken = generateToken;
const clearToken = (res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
};
exports.clearToken = clearToken;
