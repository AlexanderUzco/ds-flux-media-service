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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.find().populate('createdBy');
    return categories;
});
exports.getCategories = getCategories;
const getCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findById(id).populate('createdBy');
    if (!category) {
        throw new Error('Category not found');
    }
    return category;
});
exports.getCategory = getCategory;
const createCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageUrl, description, createdBy, ref } = category;
    const categoryExists = yield category_model_1.default.findOne({ name });
    if (categoryExists) {
        throw new Error('Category already exists');
    }
    const categoryData = yield category_model_1.default.create({
        name,
        imageUrl,
        description,
        ref,
        createdBy,
    });
    return categoryData;
});
exports.createCategory = createCategory;
const updateCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, imageUrl, description, ref } = category;
    const categoryExists = yield category_model_1.default.findById(id);
    if (!categoryExists) {
        throw new Error('Category not found');
    }
    categoryExists.name = name;
    categoryExists.imageUrl = imageUrl;
    categoryExists.description = description;
    categoryExists.ref = ref;
    yield categoryExists.save();
    return categoryExists;
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findByIdAndDelete(id);
    if (!category) {
        throw new Error('Category not found');
    }
    // Delete all content items associated with the category
    // Topics
    // Delete all topics associated with the category
    //await deleteTopicsByCategory(id);
    return category;
});
exports.deleteCategory = deleteCategory;
