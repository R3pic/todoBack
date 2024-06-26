import { MysqlConfig } from "../configure/mysql.config.js";

const findAll = async () => {
    const query = "SELECT * FROM todo";
    const results = await MysqlConfig.allQuery(query);
    const todos = [];
    results.forEach((row) => {
        row.isDone = Boolean(row.isDone);
        todos.push(row);
    });
    return todos;
};

const add = async (todo) => {
    console.log("요청온 투두",todo);
    // https://www.geeksforgeeks.org/how-to-convert-javascript-datetime-to-mysql-datetime/
    // const createdDate = new Date(todo.createdDate).toISOString().slice(0, 19).replace('T', ' '); // 프론트에서 DateTime 생성
    // const query = `INSERT INTO todo (content, isDone, createdDate) VALUES ('${todo.content}', '${todo.isDone === true ? 1 : 0}', '${createdDate}')`;
    const query = `INSERT INTO todo (content, isDone) VALUES ('${todo.content}', '${todo.isDone === true ? 1 : 0}')`;
    const { insertId } = await MysqlConfig.runQuery(query);
    const selQuery = `SELECT * FROM todo WHERE id = ${insertId}`;
    return await MysqlConfig.getQuery(selQuery);
};

const update = async (id, todo) => {
    const query = `UPDATE todo SET isDone = '${todo.isDone === true ? 1 : 0}' WHERE id = ${id}`;
    await MysqlConfig.runQuery(query)
    const selQuery = `SELECT * FROM todo WHERE id = ${id}`;
    return await MysqlConfig.getQuery(selQuery);
};

const remove = async (id) => {
    const selQuery = `SELECT * FROM todo WHERE id = ${id}`;
    const removedData = await MysqlConfig.getQuery(selQuery);
    const query = `DELETE FROM todo WHERE id = ${id}`;
    await MysqlConfig.runQuery(query);
    return removedData
};

export const TodoHandlerMysql = {
    findAll,
    add,
    update,
    remove,
};
