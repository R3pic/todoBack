import 'dotenv/config.js';
import express from "express";
import cors from "cors";
import https from "https";

import todoRouter from "./todo/todo.router.js"
import { MysqlConfig} from "./configure/mysql.config.js";
import { ExpressOption } from "./configure/express.config.js";
import { ErrorHandler } from "./common/errorHandler.js";

MysqlConfig.open();
MysqlConfig.initialize();

const app = express()
    .set('Host', process.env.HOST || 'localhost')
    .use(cors(ExpressOption.cors_option),
        express.json(),
        express.urlencoded({ extended: true }))
    .use("/todos", todoRouter)
    .use(ErrorHandler.NotFoundHandler)
    .use(ErrorHandler.MainErrorHandler);

https.createServer(ExpressOption.ssl_option, app).listen(ExpressOption.ssl_option.port, () => {
    console.log(`HTTPS server started on port ${ExpressOption.ssl_option.port}`);
});