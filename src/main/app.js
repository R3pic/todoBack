import express from "express";

// import indexRouter from "../routes/index.js";
import todoRouter from "./todo/todo.router.js"

import path from "node:path";
import { RdbmsConfig } from "./configure/rdbms.config.js";

RdbmsConfig.open();
RdbmsConfig.initialize();


const app = express();

app.set("host", process.env.HOST || 'localhost')
app.set("port", process.env.PORT || 3000);

app.use("/", express.static(path.join(process.cwd(), "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/todos", todoRouter);

app.listen(app.get("port"), () => {
    console.info("Listening on port", app.get("port"));
})