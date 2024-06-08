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
exports.createNewPassword = exports.requestResetPassword = void 0;
const errors_1 = require("../utils/errors");
const resetPassword_service_1 = require("../services/resetPassword.service");
const common_1 = require("../utils/common");
const resetPasswordEmail_1 = __importDefault(require("../utils/email/resetPasswordEmail"));
const requestResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const token = yield (0, resetPassword_service_1.createResetPassword)(email);
        yield (0, resetPasswordEmail_1.default)({
            to: email,
            url: `${(0, common_1.getBaseUrl)(req)}/reset-password?token=${token}`,
        });
        res
            .status(200)
            .json({ message: 'Email sent with reset instructions', token });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error request ResetPassword', error);
    }
});
exports.requestResetPassword = requestResetPassword;
const createNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, newPassword } = req.body;
        const user = yield (0, resetPassword_service_1.verifyResetPassword)(token, newPassword);
        res.status(200).json({ message: 'Password updated', user });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error create New Password', error);
    }
});
exports.createNewPassword = createNewPassword;
