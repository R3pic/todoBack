import sqlite3 from "sqlite3";
import { promisify } from "util";

let rdbms;

let rdbmsGet;
let rdbmsAll;

const open = () => {
    rdbms = new sqlite3.Database(":memory:");
    rdbmsGet = promisify(rdbms.get).bind(rdbms);
    rdbmsAll = promisify(rdbms.all).bind(rdbms);
};

const close = () => {
    rdbms.close();
};

const createTable = () => {
    return `CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    isDone BOOLEAN,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)`;
};

const insertDummy = () => {
    return `INSERT INTO todo (content, isDone)
            VALUES ('First Todo', false)
            , ('Second Todo', true)
            , ('Third Todo', false)
            , ('Fourth Todo', true)
            , ('Fifth Todo', true)`;
};

const initialize = () => {
    runQuery(createTable());
    // runQuery(insertDummy());
};

const runQuery = (query) => {
    return rdbms.exec(query);
};

const getQuery = async (query) => {
    try {
        return await rdbmsGet(query);
    } catch (err){
        console.error(err);
    }
};

const allQuery = async (query) => {
    try {
        return await rdbmsAll(query);
    } catch (err) {
        console.error(err);
    }
}

export const RdbmsConfig = {
    initialize,
    close,
    open,
    runQuery,
    getQuery,
    allQuery,
};
