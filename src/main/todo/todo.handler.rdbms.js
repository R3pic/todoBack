import { RdbmsConfig } from "../configure/rdbms.config.js";

const findAll = async () => {
    const query = "SELECT * FROM todo";
    const rows = await RdbmsConfig.allQuery(query);
    const todos = [];
    rows.forEach((row) => {
        row.isDone = Boolean(row.isDone);
        todos.push(row);
    });

    return todos;
};


const add = async (todo) => {
    const query = `INSERT INTO todo (content, isDone, createdDate) VALUES ('${todo.content}', '${todo.isDone === true ? 1 : 0}', '${todo.createdDate}') RETURNING *`;
    return await RdbmsConfig.getQuery(query);
};

const update = async (id, todo) => {
    console.info("업데이트 요청", id, todo);
    const query = `UPDATE todo SET isDone = '${todo.isDone === true ? 1 : 0}' WHERE id = ${id} RETURNING *`;
    return await RdbmsConfig.getQuery(query);
};

const remove = async (id) => {
    const query = `DELETE FROM todo WHERE id = ${id} RETURNING *`;
    return await RdbmsConfig.getQuery(query);
};

export const TodoHandlerRdbms = {
    findAll,
    add,
    update,
    remove,
};
