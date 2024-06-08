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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUniqueUsernameRequest = exports.authenticateUser = exports.signoutUser = exports.signinUser = exports.signupUser = void 0;
const errors_1 = require("../utils/errors");
const users_service_1 = require("../services/users.service");
const auth_1 = require("../utils/auth");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const responseSignUser = yield (0, users_service_1.signupUserBase)(body);
        if (!responseSignUser)
            throw new Error('Error creating user');
        const { id, username, email } = responseSignUser;
        const token = (0, auth_1.generateToken)(res, id);
        res.status(201).json({ id, username, email, token });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error signin user', error);
    }
});
exports.signupUser = signupUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const responseExistUser = yield (0, users_service_1.checkExistUser)(body);
        if (!responseExistUser)
            throw new Error('User dont exist');
        const { id, email, username, role } = responseExistUser;
        const token = (0, auth_1.generateToken)(res, id);
        res.status(201).json({ id, email, username, role, token });
    }
    catch (error) {
        const errorMessage = (error instanceof Error && error.message) || 'Error signup user';
        (0, errors_1.handleErrorHttp)(res, errorMessage);
    }
});
exports.signinUser = signinUser;
const signoutUser = (req, res) => {
    try {
        (0, auth_1.clearToken)(res);
        res.status(200).json({ message: 'User logged out' });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error signoutUser user');
    }
};
exports.signoutUser = signoutUser;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userData = yield (0, users_service_1.verifyAuthenticatedUser)((_a = req.user) === null || _a === void 0 ? void 0 : _a.userID);
        if (!userData)
            throw new Error('User not found');
        res.status(200).json({
            id: userData.id,
            email: userData.email,
            username: userData.username,
            role: userData.role,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error authenticateUser user');
    }
});
exports.authenticateUser = authenticateUser;
const verifyUniqueUsernameRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield (0, users_service_1.findUserByUsername)(username);
        if (user) {
            res
                .status(200)
                .json({ message: 'Username already exists', exists: true });
        }
        else {
            res.status(200).json({ message: 'Username available', exists: false });
        }
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error verifyUniqueUsernameRequest', error);
    }
});
exports.verifyUniqueUsernameRequest = verifyUniqueUsernameRequest;
