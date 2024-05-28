import sqlite3 from "sqlite3";

let rdbms;

const open = async () => {
  return new Promise((resolve, reject) => {
    rdbms = new sqlite3.Database(":memory:", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Connected to the in-memory SQLite database');
        resolve();
      }
    });
  });
};

const close = async () => {
  return new Promise((resolve, reject) => {
    rdbms.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Database connection closed.');
        resolve();
      }
    });
  });
};

const createTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    status TEXT)`;
  return runQuery(query);
};

const insertDummy = async () => {
  const query = `INSERT INTO todo (title, status)
                VALUES ('First Todo', 'unreached'),
                       ('Second Todo', 'reached'),
                       ('Third Todo', 'unreached'),
                       ('Fourth Todo', 'reached'),
                       ('Fifth Todo', 'reached')`;
  return runQuery(query);
};

const initialize = async () => {
    await createTable();
    await insertDummy();
};

const runQuery = async (query) => {
  return new Promise((resolve, reject) => {
    rdbms.exec(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const allQuery = async (query) => {
  return new Promise((resolve, reject) => {
    rdbms.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getQuery = async (query) => {
  return new Promise((resolve, reject) => {
    rdbms.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const RdbmsConfig = {
  initialize,
  close,
  open,
  runQuery,
  getQuery,
  allQuery,
};
