"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginZodValidation = exports.userZodValidation = void 0;
const zod_1 = require("zod");
exports.userZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is Required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
    }),
});
exports.userLoginZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is Required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
