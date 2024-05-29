import path from "node:path";
import express from "express";
import cors from "cors";
import https from "https";

import todoRouter from "./todo/todo.router.js"
import { RdbmsConfig } from "./configure/rdbms.config.js";
import { ExpressOption } from "./configure/express.config.js";
import { findErrorCode, findErrorMessage } from "./common/error.message.js";

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
        const message = findErrorMessage("NOT_FOUND");
        res.status(404).json({ error: message });
        next()
    })
    .use((err, req, res, next) => {
        console.log(err);
        const code = err.code || "UNKNOWN";
        const message = findErrorMessage(code);
        res.status(findErrorCode(err)).json({ error: message });
    });

https.createServer(ExpressOption.ssl_option, app).listen(ExpressOption.ssl_option.port, () => {
    console.log(`HTTPS server started on port ${ExpressOption.ssl_option.port}`);
});