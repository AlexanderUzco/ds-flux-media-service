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
exports.deleteFilesItems = exports.deleteFilesItem = exports.updateFilesItem = exports.createFilesItems = exports.createFilesItem = exports.getFilesItem = exports.getFilesItemByIds = exports.getFilesItems = void 0;
const filesItem_model_1 = __importDefault(require("../models/filesItem.model"));
const getFilesItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const filesItems = yield filesItem_model_1.default.find();
    return filesItems;
});
exports.getFilesItems = getFilesItems;
const getFilesItemByIds = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const filesItems = yield filesItem_model_1.default.find({ _id: { $in: ids } });
    return filesItems;
});
exports.getFilesItemByIds = getFilesItemByIds;
const getFilesItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const filesItem = yield filesItem_model_1.default.findById(id);
    if (!filesItem) {
        throw new Error('FilesItem not found');
    }
    return filesItem;
});
exports.getFilesItem = getFilesItem;
const createFilesItem = (filesItem) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, url, ref, createdBy } = filesItem;
    const filesItemExists = yield filesItem_model_1.default.findOne({ name });
    if (filesItemExists) {
        throw new Error('FilesItem already exists');
    }
    const filesItemData = yield filesItem_model_1.default.create({
        name,
        type,
        url,
        createdBy,
        ref,
    });
    return filesItemData;
});
exports.createFilesItem = createFilesItem;
const createFilesItems = (filesItems) => __awaiter(void 0, void 0, void 0, function* () {
    const filesItemsData = yield filesItem_model_1.default.insertMany(filesItems);
    return filesItemsData;
});
exports.createFilesItems = createFilesItems;
const updateFilesItem = (filesItem) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, type, url } = filesItem;
    const filesItemExists = yield filesItem_model_1.default.findById(id);
    if (!filesItemExists) {
        throw new Error('FilesItem not found');
    }
    filesItemExists.name = name;
    filesItemExists.type = type;
    filesItemExists.url = url;
    yield filesItemExists.save();
    return filesItemExists;
});
exports.updateFilesItem = updateFilesItem;
const deleteFilesItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const filesItem = yield filesItem_model_1.default.findByIdAndDelete(id);
    if (!filesItem) {
        throw new Error('FilesItem not found');
    }
    return filesItem;
});
exports.deleteFilesItem = deleteFilesItem;
const deleteFilesItems = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const filesItems = yield filesItem_model_1.default.deleteMany({ _id: { $in: ids } });
    return filesItems;
});
exports.deleteFilesItems = deleteFilesItems;
