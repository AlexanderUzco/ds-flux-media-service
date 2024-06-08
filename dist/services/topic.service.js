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
exports.validateContentByTopic = exports.deleteTopicsByCategory = exports.deleteTopics = exports.deleteTopic = exports.updateTopic = exports.createTopic = exports.getTopic = exports.getTopics = void 0;
const topic_model_1 = __importDefault(require("../models/topic.model"));
const getTopics = () => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find()
        .populate('categoryID')
        .populate('createdBy');
    return topics;
});
exports.getTopics = getTopics;
const getTopic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findById(id)
        .populate('categoryID')
        .populate('createdBy');
    if (!topic) {
        throw new Error('Topic not found');
    }
    return topic;
});
exports.getTopic = getTopic;
const createTopic = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, color, categoryID, allowContent, createdBy } = topic;
    const topicExists = yield topic_model_1.default.findOne({ name });
    if (topicExists) {
        throw new Error('Topic already exists');
    }
    const topicData = yield topic_model_1.default.create({
        name,
        color,
        categoryID,
        allowContent,
        createdBy,
    });
    return topicData;
});
exports.createTopic = createTopic;
const updateTopic = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, color, categoryID, allowContent } = topic;
    const topicExists = yield topic_model_1.default.findById(id);
    if (!topicExists) {
        throw new Error('Topic not found');
    }
    topicExists.name = name;
    topicExists.color = color;
    topicExists.categoryID = categoryID;
    topicExists.allowContent = allowContent;
    yield topicExists.save();
    return topicExists;
});
exports.updateTopic = updateTopic;
const deleteTopic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findByIdAndDelete(id);
    if (!topic) {
        throw new Error('Topic not found');
    }
    return topic;
});
exports.deleteTopic = deleteTopic;
const deleteTopics = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.deleteMany({ _id: { $in: ids } });
    return topics;
});
exports.deleteTopics = deleteTopics;
const deleteTopicsByCategory = (categoryID) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.deleteMany({ categoryID });
    return topics;
});
exports.deleteTopicsByCategory = deleteTopicsByCategory;
const validateContentByTopic = (topicID, content) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield getTopic(topicID);
    if (!topic.allowContent) {
        throw new Error('Topic does not allow content');
    }
    // Verify is content is allowed by topic
    const { image, document, video, text } = topic.allowContent;
    if (content.images && !image) {
        throw new Error('Content does not allow image');
    }
    if (content.videos && !video) {
        throw new Error('Content does not allow video');
    }
    if (content.text && !text) {
        throw new Error('Content does not allow text');
    }
});
exports.validateContentByTopic = validateContentByTopic;
