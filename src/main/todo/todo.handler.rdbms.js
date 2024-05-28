import {RdbmsConfig} from "../configure/rdbms.config.js";

const findAll = async () => {
  const query = `SELECT * FROM todo`;
  return await RdbmsConfig.allQuery(query);
};

const add = async (todo) => {
  const query = `INSERT INTO todo (title, status) VALUES ('${todo.title}', '${todo.status}') RETURNING *`;
  return await RdbmsConfig.getQuery(query);
};

const update = async (id, todo) => {

  const query = `UPDATE todo SET title = '${todo.title}', status = '${todo.status}' WHERE id = ${id} RETURNING *`;
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
