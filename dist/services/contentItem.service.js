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
exports.getTotalItemsSummary = exports.getContentItemByUserID = exports.deleteContentItem = exports.updateContentItem = exports.createContentItem = exports.getContentItem = exports.getContentItems = void 0;
const contentItem_model_1 = __importDefault(require("../models/contentItem.model"));
const filesItem_model_1 = __importDefault(require("../models/filesItem.model"));
const topic_service_1 = require("./topic.service");
const getContentItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const contentItems = yield contentItem_model_1.default.find()
        .populate('createdBy')
        .populate({
        path: 'topicID',
        populate: { path: 'categoryID' },
    })
        .populate('content.videos')
        .populate('content.images');
    const totalItemsSummary = {
        totalItems: contentItems.length,
        totalImages: 0,
        totalVideos: 0,
        totalText: 0,
    };
    contentItems.forEach((contentItem) => {
        totalItemsSummary.totalImages += contentItem.content.images.length;
        totalItemsSummary.totalVideos += contentItem.content.videos.length;
        totalItemsSummary.totalText += 1;
    });
    return { contentItems, totalItemsSummary };
});
exports.getContentItems = getContentItems;
const getContentItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contentItem = yield contentItem_model_1.default.findById(id)
        .populate('createdBy')
        .populate({
        path: 'topicID',
        populate: { path: 'categoryID' },
    })
        .populate('content.videos')
        .populate('content.images');
    if (!contentItem) {
        throw new Error('ContentItem not found');
    }
    return contentItem;
});
exports.getContentItem = getContentItem;
const getContentItemByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const contentItems = yield contentItem_model_1.default.find({ createdBy: userID })
        .populate('createdBy')
        .populate('topicID')
        .populate('content.videos')
        .populate('content.images');
    return contentItems;
});
exports.getContentItemByUserID = getContentItemByUserID;
const getTotalItemsSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    //Get all content (images count, videos count, text count) from items
    const contentItems = yield contentItem_model_1.default.find()
        .populate('createdBy')
        .populate('topicID')
        .populate('content.videos')
        .populate('content.images');
    if (!contentItems) {
        throw new Error('ContentItems not found');
    }
    const totalItemsSummary = {
        totalItems: contentItems.length,
        totalImages: 0,
        totalVideos: 0,
        totalText: 0,
    };
    contentItems.forEach((contentItem) => {
        totalItemsSummary.totalImages += contentItem.content.images.length;
        totalItemsSummary.totalVideos += contentItem.content.videos.length;
        totalItemsSummary.totalText += 1;
    });
    return totalItemsSummary;
});
exports.getTotalItemsSummary = getTotalItemsSummary;
const createContentItem = (contentItem) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, topicID, content, createdBy } = contentItem;
    const contentItemExists = yield contentItem_model_1.default.findOne({ title }).populate('topicID');
    if (contentItemExists) {
        throw new Error('ContentItem already exists');
    }
    const topic = yield (0, topic_service_1.getTopic)(topicID);
    if (!topic.allowContent) {
        throw new Error('Topic does not allow content');
    }
    yield (0, topic_service_1.validateContentByTopic)(topicID, content);
    const contentItemData = yield contentItem_model_1.default.create({
        title,
        topicID,
        content,
        createdBy,
    });
    return contentItemData;
});
exports.createContentItem = createContentItem;
const updateContentItem = (contentItem) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, topicID, content } = contentItem;
    const contentItemExists = yield contentItem_model_1.default.findById(id);
    if (!contentItemExists) {
        throw new Error('ContentItem not found');
    }
    contentItemExists.title = title;
    contentItemExists.topicID = topicID;
    contentItemExists.content = content;
    yield contentItemExists.save();
    return contentItemExists;
});
exports.updateContentItem = updateContentItem;
const deleteContentItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contentItem = yield contentItem_model_1.default.findByIdAndDelete(id);
    if (!contentItem) {
        throw new Error('ContentItem not found');
    }
    yield filesItem_model_1.default.deleteMany({ _id: { $in: contentItem.content.images } });
    return contentItem;
});
exports.deleteContentItem = deleteContentItem;
