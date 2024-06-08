"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AllowContentSchema = new mongoose_1.Schema({
    text: { type: Boolean, required: true },
    image: { type: Boolean, required: true },
    video: { type: Boolean, required: true },
}, { _id: false });
const TopicSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    categoryID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    allowContent: { type: AllowContentSchema, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    versionKey: false,
});
const TopicModel = (0, mongoose_1.model)('Topic', TopicSchema);
exports.default = TopicModel;
