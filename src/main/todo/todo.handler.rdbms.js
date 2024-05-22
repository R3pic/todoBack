import { RdbmsConfig } from "../configure/rdbms.config.js";

const findAll = () => {
    const query = "SELECT * FROM todo"; //*로 전체 속성 조회
    return RdbmsConfig.allQuery(query);
};

const add = (todo) => {
    //RETURNING *로 행이 아닌 속성을 반환할 것을 지정.
    const query = `INSERT INTO todo (title, status) VALUES ('${todo.title}', '${todo.status}') RETURNING *`;
    return RdbmsConfig.getQuery(query);
};

const update = (id, todo) => {
    const query = `UPDATE todo SET title = '${todo.title}', status = '${todo.status}' WHERE id = ${id} RETURNING *`;
    return RdbmsConfig.getQuery(query);
};

const remove = (id) => {
    const query = `DELETE FROM todo WHERE id = ${id} RETURNING *`; //그냥 지울 거니까 속성값 필요 없음
    return RdbmsConfig.getQuery(query);
};

export const TodoHandlerRdbms = {
    findAll,
    add,
    update,
    remove,
};
