import createError, { HttpError } from "http-errors";
import express, { NextFunction, Response, Request } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { router } from "./routes";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  "/phaser",
  express.static(path.join(__dirname, "..", "..", "phaser", "dist"))
);
app.use("/api", router);
app.use(express.static(path.join(__dirname, "..", "..", "office", "build")));

// If it's here, it's a 404
app.use(function (req, res, next) {
  next(createError(404));
});

// default error handler
app.use(function (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(err.status || 500);
  res.send(err);
});
