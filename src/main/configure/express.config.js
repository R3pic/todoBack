import fs from "node:fs";
import path from "node:path";

const cors_option = {
    origin: process.env.CORS_OPTION
}

const ssl_option = {
    key: fs.readFileSync(path.join(process.cwd(), "resource/cert/privkey.pem")),
    cert: fs.readFileSync(path.join(process.cwd(), "resource/cert/fullchain.pem")),
    port: process.env.PORT || 3000,
}

export const ExpressOption = {
    cors_option,
    ssl_option,
}