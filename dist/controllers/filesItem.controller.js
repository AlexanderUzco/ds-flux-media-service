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
exports.createFilesItemsRequest = exports.createFilesItemRequest = void 0;
const errors_1 = require("../utils/errors");
const filesItem_service_1 = require("../services/filesItem.service");
const createFilesItemRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const newFilesItem = yield (0, filesItem_service_1.createFilesItem)(body);
        if (!newFilesItem)
            throw new Error('Error creating filesItem');
        res.status(201).send({
            message: 'FilesItem created',
            filesItem: newFilesItem,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error creating filesItem', error);
    }
});
exports.createFilesItemRequest = createFilesItemRequest;
const createFilesItemsRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const newFilesItem = yield (0, filesItem_service_1.createFilesItems)(body);
        if (!newFilesItem)
            throw new Error('Error creating filesItems');
        res.status(201).send({
            message: 'FilesItems created',
            filesItem: newFilesItem,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error creating filesItems', error);
    }
});
exports.createFilesItemsRequest = createFilesItemsRequest;
