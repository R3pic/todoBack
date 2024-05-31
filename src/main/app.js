import 'dotenv/config.js';
import path from "node:path";
import express from "express";
import cors from "cors";
import https from "https";
import createHttpError from "http-errors";

import todoRouter from "./todo/todo.router.js"
import { RdbmsConfig } from "./configure/rdbms.config.js";
import { ExpressOption } from "./configure/express.config.js";
import { ErrorHandler } from "./common/errorHandler.js";

RdbmsConfig.open();
RdbmsConfig.initialize();

const app = express()
    .set('Host', process.env.HOST || 'localhost')
    .use(cors(ExpressOption.cors_option))
    .use("/", express.static(path.join(process.cwd(), "public")))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use("/todos", todoRouter)
    .use((req, res, next) => {
        console.log("404 Not Found 미들웨어");
        next(createHttpError(404, `Router ${req.url} Not Found\n`));
    })
    .use(ErrorHandler);

https.createServer(ExpressOption.ssl_option, app).listen(ExpressOption.ssl_option.port, () => {
    console.log(`HTTPS server started on port ${ExpressOption.ssl_option.port}`);
});