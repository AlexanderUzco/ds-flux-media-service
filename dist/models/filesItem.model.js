"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FilesItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['image', 'document', 'video'],
        required: true,
    },
    url: { type: String, required: true },
    ref: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    versionKey: false,
});
const FilesItemModel = (0, mongoose_1.model)('FilesItem', FilesItemSchema);
exports.default = FilesItemModel;
