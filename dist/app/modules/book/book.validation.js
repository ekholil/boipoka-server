"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookUpdateZodValidation = exports.bookZodValidation = void 0;
const zod_1 = require("zod");
exports.bookZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is Required",
        }),
        author: zod_1.z.string({ required_error: "Author is Required" }),
        genre: zod_1.z.string({ required_error: "Genre is Required" }),
        publicationDate: zod_1.z.number({
            required_error: "Publication Date is required",
        }),
    }),
});
exports.bookUpdateZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z
            .enum([
            "Dhaka",
            "Chattogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh",
        ])
            .optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        category: zod_1.z.enum(["Dairy", "Beef", "Dual Purpose"]).optional(),
        budget: zod_1.z.number().optional(),
        label: zod_1.z.enum(["for sale", "sold out"]).optional(),
        seller: zod_1.z.string().optional(),
    }),
});
