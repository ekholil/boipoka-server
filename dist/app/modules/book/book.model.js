"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Number,
        required: true,
    },
    reveiws: {
        name: {
            type: String,
        },
        review: {
            type: String,
        },
    },
    title: {
        type: String,
        required: true,
    },
    creatorId: {
        required: true,
        type: String,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
