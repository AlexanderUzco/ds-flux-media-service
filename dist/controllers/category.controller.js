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
exports.deleteCategoryRequest = exports.updateCategoryRequest = exports.createCategoryRequest = exports.getCategoriesRequest = exports.getCategoryRequest = void 0;
const errors_1 = require("../utils/errors");
const category_service_1 = require("../services/category.service");
const getCategoryRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryID } = req.params;
        const category = yield (0, category_service_1.getCategory)(categoryID);
        if (!category)
            throw new Error('Category not found');
        res.status(200).send({
            message: 'Category found',
            category,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error getting category', error);
    }
});
exports.getCategoryRequest = getCategoryRequest;
const getCategoriesRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_service_1.getCategories)();
        if (!categories)
            throw new Error('Error getting categories');
        res.status(200).send({
            message: 'Categories found',
            categories,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error getting categories', error);
    }
});
exports.getCategoriesRequest = getCategoriesRequest;
const createCategoryRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const newCategory = yield (0, category_service_1.createCategory)(body);
        if (!newCategory)
            throw new Error('Error creating category');
        res.status(201).send({
            message: 'Category created',
            category: newCategory,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error creating category', error);
    }
});
exports.createCategoryRequest = createCategoryRequest;
const updateCategoryRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { categoryID } = req.params;
        const updatedCategory = yield (0, category_service_1.updateCategory)(Object.assign(Object.assign({}, body), { id: categoryID }));
        if (!updatedCategory)
            throw new Error('Error updating category');
        res.status(200).send({
            message: 'Category updated',
            category: updatedCategory,
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error updating category', error);
    }
});
exports.updateCategoryRequest = updateCategoryRequest;
const deleteCategoryRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryID } = req.params;
        const category = yield (0, category_service_1.deleteCategory)(categoryID);
        if (!category)
            throw new Error('Error deleting category');
        res.status(200).send({
            message: 'Category deleted',
        });
    }
    catch (error) {
        (0, errors_1.handleErrorHttp)(res, 'Error deleting category', error);
    }
});
exports.deleteCategoryRequest = deleteCategoryRequest;
