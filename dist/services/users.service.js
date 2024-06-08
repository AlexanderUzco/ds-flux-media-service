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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsername = exports.findUserByEmail = exports.verifyAuthenticatedUser = exports.checkExistUser = exports.signupUserBase = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.findUserByEmail = findUserByEmail;
const signupUserBase = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, role } = user;
    const userExists = yield users_model_1.default.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }
    if (role === 'ADMIN') {
        throw new Error('User not allowed to create admin users');
    }
    const userData = yield users_model_1.default.create({
        username,
        email,
        password,
        role,
    });
    return userData;
});
exports.signupUserBase = signupUserBase;
const checkExistUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    const userExists = yield users_model_1.default.findOne({ email });
    if (!userExists) {
        throw new Error('User not found');
    }
    if (!(yield userExists.comparePassword(password)))
        throw new Error('Data incorrect, please verify');
    return userExists;
});
exports.checkExistUser = checkExistUser;
const verifyAuthenticatedUser = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userID) {
        throw new Error('UserID not found');
    }
    const userData = yield users_model_1.default.findById(userID, 'username email role');
    if (!userData) {
        throw new Error('User not found');
    }
    return userData;
});
exports.verifyAuthenticatedUser = verifyAuthenticatedUser;
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({ username });
    return user;
});
exports.findUserByUsername = findUserByUsername;
