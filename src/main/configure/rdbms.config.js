import sqlite3 from "sqlite3";

let rdbms;

const open = () => {
    rdbms = new sqlite3.Database(":memory:");
};

const close = () => {
    rdbms.close();
};

const createTable = () => {
    console.info("Create Table");
    return `CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    status TEXT)`;
};

const insertDummy = () => {
    console.info("Add dummy");
    return `INSERT INTO todo (title, status)
            VALUES ('First Todo', 'unreached')
            , ('Second Todo', 'reached')
            , ('Third Todo', 'unreached')
            , ('Fourth Todo', 'reached')
            , ('Fifth Todo', 'reached')`;
};

const initialize = () => {
    runQuery(createTable());
    runQuery(insertDummy());

    const query = "SELECT * FROM todo"; //*로 전체 속성 조회
    let data = allQuery(query);
    console.info(data);
};

const runQuery = (query) => {
    return rdbms.exec(query);
};

const getQuery = (query) => {
    return rdbms.get(query);
};

const allQuery = (query) => {
    return rdbms.all(query);
};

export const RdbmsConfig = {
    initialize,
    close,
    open,
    runQuery,
    getQuery,
    allQuery,
};
