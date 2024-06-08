"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const ResetPasswordSchema = new mongoose_1.Schema({
    userID: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    resetToken: { type: String, required: true },
    expiresAt: { type: Date, required: true, expires: 0 },
}, {
    timestamps: true,
    versionKey: false,
});
ResetPasswordSchema.methods.generateResetToken = function () {
    const buffer = crypto_1.default.randomBytes(32);
    const token = buffer.toString('hex');
    this.resetToken = token;
    this.expiresAt = new Date(Date.now() + 3600000); // Token válido por 1 hora
    return token;
};
const ResetPasswordModel = (0, mongoose_1.model)('ResetPassword', ResetPasswordSchema);
exports.default = ResetPasswordModel;
