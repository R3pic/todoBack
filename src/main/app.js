import path from "node:path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import todoRouter from "./todo/todo.router.js"
import { RdbmsConfig } from "./configure/rdbms.config.js";

dotenv.config();
RdbmsConfig.open();
RdbmsConfig.initialize();

const app = express();

app.set("host", process.env.HOST || 'localhost')
app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use("/", express.static(path.join(process.cwd(), "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/todos", todoRouter);

app.listen(app.get("port"), () => {
    console.info("Listening on port", app.get("port"));
})