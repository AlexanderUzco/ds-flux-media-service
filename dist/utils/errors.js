"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorHttp = void 0;
const mongoose_1 = require("mongoose");
// Helper function to format Mongoose validation errors
const formatMongooseValidationError = (error) => {
    const errors = error.errors;
    const formattedErrors = {};
    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            formattedErrors[key] = errors[key].message;
        }
    }
    return formattedErrors;
};
const handleErrorHttp = (res, message, errorRaw) => {
    if (!errorRaw) {
        res.status(500).send({
            message: message,
        });
    }
    if (errorRaw instanceof mongoose_1.Error) {
        return res.status(400).send({
            message: errorRaw.name,
            errors: formatMongooseValidationError(errorRaw),
        });
    }
    if (errorRaw instanceof Error) {
        res.status(500).send({
            message: errorRaw.message,
        });
    }
};
exports.handleErrorHttp = handleErrorHttp;
