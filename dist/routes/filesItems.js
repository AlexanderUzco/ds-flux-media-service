"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const filesItem_controller_1 = require("../controllers/filesItem.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', (0, auth_middleware_1.authenticate)(['ADMIN', 'WRITER']), filesItem_controller_1.createFilesItemRequest);
router.post('/create-files', (0, auth_middleware_1.authenticate)(['ADMIN', 'WRITER']), filesItem_controller_1.createFilesItemsRequest);
