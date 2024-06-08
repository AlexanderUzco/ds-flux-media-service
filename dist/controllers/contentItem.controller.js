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
exports.getTotalItemsSummaryRequest = exports.getContentItemByUserIDRequest = exports.deleteContentItemRequest = exports.updateContentItemRequest = exports.createContentItemRequest = exports.getContentItemsRequest = exports.getContentItemRequest = void 0;
const errors_1 = require("../utils/errors");
const contentItem_service_1 = require("../services/contentItem.service");
const getContentItemRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentItemID } = req.params;
        const contentItem = yield (0, contentItem_service_1.getContentItem)(contentItemID);
        if (!contentItem)
            throw new Error('ContentItem not found');
        res.status(200).send({
            message: 'ContentItem found',
            contentItem,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error getting contentItem', error);
    }
});
exports.getContentItemRequest = getContentItemRequest;
const getContentItemsRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentItemsRes = yield (0, contentItem_service_1.getContentItems)();
        if (!contentItemsRes)
            throw new Error('Error getting contentItems');
        res.status(200).send(Object.assign({ message: 'ContentItems found' }, contentItemsRes));
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error getting contentItems', error);
    }
});
exports.getContentItemsRequest = getContentItemsRequest;
const getContentItemByUserIDRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const contentItems = yield (0, contentItem_service_1.getContentItemByUserID)(userID);
        if (!contentItems)
            throw new Error('Error getting contentItems');
        res.status(200).send({
            message: 'ContentItems found',
            contentItems,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error getting contentItems', error);
    }
});
exports.getContentItemByUserIDRequest = getContentItemByUserIDRequest;
const createContentItemRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const newContentItem = yield (0, contentItem_service_1.createContentItem)(body);
        if (!newContentItem)
            throw new Error('Error creating contentItem');
        res.status(201).send({
            message: 'ContentItem created',
            contentItem: newContentItem,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error creating contentItem', error);
    }
});
exports.createContentItemRequest = createContentItemRequest;
const updateContentItemRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const updatedContentItem = yield (0, contentItem_service_1.updateContentItem)(body);
        if (!updatedContentItem)
            throw new Error('Error updating contentItem');
        res.status(200).send({
            message: 'ContentItem updated',
            contentItem: updatedContentItem,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error updating contentItem', error);
    }
});
exports.updateContentItemRequest = updateContentItemRequest;
const deleteContentItemRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentItemID } = req.params;
        const deletedContentItem = yield (0, contentItem_service_1.deleteContentItem)(contentItemID);
        if (!deletedContentItem)
            throw new Error('Error deleting contentItem');
        res.status(200).send({
            message: 'ContentItem deleted',
            contentItem: deletedContentItem,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error deleting contentItem', error);
    }
});
exports.deleteContentItemRequest = deleteContentItemRequest;
const getTotalItemsSummaryRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalItemsSummary = yield (0, contentItem_service_1.getTotalItemsSummary)();
        if (!totalItemsSummary)
            throw new Error('Error getting totalItemsSummary');
        res.status(200).send({
            message: 'TotalItemsSummary found',
            totalItemsSummary,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error deleting contentItem', error);
    }
});
exports.getTotalItemsSummaryRequest = getTotalItemsSummaryRequest;
