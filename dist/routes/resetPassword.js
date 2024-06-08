"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const resetPassword_controller_1 = require("../controllers/resetPassword.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/send-request', resetPassword_controller_1.requestResetPassword);
router.post('/change-passowrd', resetPassword_controller_1.createNewPassword);
