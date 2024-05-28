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
    //RETURNING *로 행이 아닌 속성을 반환할 것을 지정.
    const query = `INSERT INTO todo (content, isDone, createdDate) VALUES ('${todo.content}', '${todo.isDone === true ? 1 : 0}', '${todo.createdDate}') RETURNING *`;
    return await RdbmsConfig.getQuery(query);
};

const update = async (id, todo) => {
    console.info("업데이트 요청", id, todo);
    const query = `UPDATE todo SET isDone = '${todo.isDone === true ? 1 : 0}' WHERE id = ${id} RETURNING *`;
    return await RdbmsConfig.getQuery(query);
};

const remove = async (id) => {
    const query = `DELETE FROM todo WHERE id = ${id} RETURNING *`; //그냥 지울 거니까 속성값 필요 없음
    return await RdbmsConfig.getQuery(query);
};

export const TodoHandlerRdbms = {
    findAll,
    add,
    update,
    remove,
};
