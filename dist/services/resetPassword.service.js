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
exports.verifyResetPassword = exports.createResetPassword = void 0;
const resetPassword_model_1 = __importDefault(require("../models/resetPassword.model"));
const users_model_1 = __importDefault(require("../models/users.model"));
const users_service_1 = require("./users.service");
const createResetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield (0, users_service_1.findUserByEmail)(email);
    if (!userData) {
        throw new Error('User not found');
    }
    const existingResetPassword = yield resetPassword_model_1.default.findOne({
        userID: userData.id,
    });
    if (existingResetPassword) {
        yield resetPassword_model_1.default.findByIdAndDelete(existingResetPassword._id);
    }
    const resetPasswordDoc = new resetPassword_model_1.default({ userID: userData.id });
    const token = yield resetPasswordDoc.generateResetToken();
    yield resetPasswordDoc.save();
    return token;
});
exports.createResetPassword = createResetPassword;
const verifyResetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const resetPasswordDoc = yield resetPassword_model_1.default.findOne({
        resetToken: token,
    });
    if (!resetPasswordDoc || resetPasswordDoc.expiresAt < new Date()) {
        throw new Error('Invalid reset token.');
    }
    const user = yield users_model_1.default.findById(resetPasswordDoc.userID);
    if (!user) {
        throw new Error('User not found.');
    }
    user.password = newPassword;
    yield user.save();
    yield resetPassword_model_1.default.findByIdAndDelete(resetPasswordDoc._id);
    return {
        userID: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    };
});
exports.verifyResetPassword = verifyResetPassword;
