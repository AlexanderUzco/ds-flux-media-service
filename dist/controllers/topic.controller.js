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
exports.deleteTopicRequest = exports.updateTopicRequest = exports.createTopicRequest = exports.getTopicRequest = exports.getTopicsRequest = void 0;
const errors_1 = require("../utils/errors");
const topic_service_1 = require("../services/topic.service");
const getTopicsRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield (0, topic_service_1.getTopics)();
        if (!topics)
            throw new Error('Error getting topics');
        res.status(200).send({
            message: 'Topics found',
            topics,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error getting topics', error);
    }
});
exports.getTopicsRequest = getTopicsRequest;
const getTopicRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topicID } = req.params;
        const topic = yield (0, topic_service_1.getTopic)(topicID);
        if (!topic)
            throw new Error('Topic not found');
        res.status(200).send({
            message: 'Topic found',
            topic,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error getting topic', error);
    }
});
exports.getTopicRequest = getTopicRequest;
const createTopicRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const newTopic = yield (0, topic_service_1.createTopic)(body);
        if (!newTopic)
            throw new Error('Error creating topic');
        res.status(201).send({
            message: 'Topic created',
            topic: newTopic,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error creating topic', error);
    }
});
exports.createTopicRequest = createTopicRequest;
const updateTopicRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { topicID } = req.params;
        const updatedTopic = yield (0, topic_service_1.updateTopic)(Object.assign(Object.assign({}, body), { id: topicID }));
        if (!updatedTopic)
            throw new Error('Error updating topic');
        res.status(200).send({
            message: 'Topic updated',
            topic: updatedTopic,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error updating topic', error);
    }
});
exports.updateTopicRequest = updateTopicRequest;
const deleteTopicRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topicID } = req.params;
        const deletedTopic = yield (0, topic_service_1.deleteTopic)(topicID);
        if (!deletedTopic)
            throw new Error('Error deleting topic');
        res.status(200).send({
            message: 'Topic deleted',
            topic: deletedTopic,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error deleting topic', error);
    }
});
exports.deleteTopicRequest = deleteTopicRequest;
