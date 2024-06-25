import mysql from 'mysql2/promise.js';

const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1232',
    database: 'todo',
});

const open = () => {
    conn.connect();
};

const close = () => {
    conn.end();
};

const createTable = () => {
    return `CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    content TEXT,
    isDone TINYINT,
    createdDate TIMESTAMP DEFAULT now() NOT NULL)`;
};

const initialize = () => {
    runQuery(createTable())
    // runQuery(insertDummy());
};

const runQuery = async (query) => {
    try {
        const [results, fields] = await conn.query(query);
        console.log("runQuery 결과물 : ", results);
        return results;
    } catch (err) {
        console.error(err);
    }
};

const getQuery = async (query) => {
    try {
        const [results, fields] = await conn.query(query);
        console.log("getQuery 결과물 : ",results);
        console.log("getQuery 필드 : ", fields);
        return results[0];
    } catch (error) {
        console.error(error);
    }
};

const allQuery = async (query) => {
    try {
        const [results, fields] = await conn.query(query);
        console.log("allQuery 결과물 : ",results);
        console.log("allQuery 필드 : ", fields);
        return results;
    } catch (error) {
        console.error(error);
    }
}

export const MysqlConfig = {
    initialize,
    close,
    open,
    runQuery,
    getQuery,
    allQuery,
};
