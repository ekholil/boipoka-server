"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const ErrorHandler_1 = __importDefault(require("./app/middlewares/ErrorHandler"));
const book_route_1 = __importDefault(require("./app/modules/book/book.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// Cookie parser
app.use((0, cookie_parser_1.default)());
// enable cors
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// health check
app.get("/", (req, res) => {
    res.send("Server Working");
});
// routers
app.use("/api/v1", user_route_1.default);
app.use("/api/v1", book_route_1.default);
// Global Error handler
app.use(ErrorHandler_1.default);
exports.default = app;
