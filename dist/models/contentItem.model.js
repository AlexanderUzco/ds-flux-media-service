"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContentItemSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    topicID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Topic', required: true },
    content: {
        text: { type: String },
        videos: [{ type: String }],
        images: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'FilesItem' }],
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    views: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
    versionKey: false,
});
const ContentItemModel = (0, mongoose_1.model)('ContentItem', ContentItemSchema);
exports.default = ContentItemModel;
