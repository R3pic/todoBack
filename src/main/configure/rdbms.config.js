import sqlite3 from "sqlite3";
import { promisify } from "util";

let rdbms;

let rdbmsGet;
let rdbmsAll;

const open = () => {
    rdbms = new sqlite3.Database(":memory:");
    // rdbms = new sqlite3.Database("db.db");
    // sqlite3의 Callback 형식을 Promise형식으로 바꾸어주는 Wrapper를 사용함
    rdbmsGet = promisify(rdbms.get).bind(rdbms);
    rdbmsAll = promisify(rdbms.all).bind(rdbms);
};

const close = () => {
    rdbms.close();
};

const createTable = () => {
    // return `CREATE TABLE IF NOT EXISTS todo (
    // id INTEGER PRIMARY KEY AUTOINCREMENT,
    // title TEXT,
    // status TEXT)`;
    // 타임 스탬프 있는 버전
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
    // return new Promise((resolve, reject) => {
    //     rdbms.get(query, (err, row) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         else{
    //             resolve(row);
    //         }
    //     });
    // });
    try {
        return await rdbmsGet(query);
    } catch (err){
        console.error(err);
    }
};

const allQuery = async (query) => {
    // legacy-code
    // return new Promise((resolve, reject) => {
    //     rdbms.all(query, (err, rows) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         else {
    //             resolve(rows);
    //         }
    //     });
    // });
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
