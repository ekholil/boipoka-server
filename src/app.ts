import express from "express";
import cors from "cors";
import userRouter from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/ErrorHandler";
import bookRouter from "./app/modules/book/book.route";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

// Cookie parser
app.use(cookieParser());

// enable cors
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// health check
app.get("/", (req, res) => {
  res.send("Server Working");
});

// routers
app.use("/api/v1", userRouter);
app.use("/api/v1", bookRouter);

// Global Error handler
app.use(globalErrorHandler);

export default app;
