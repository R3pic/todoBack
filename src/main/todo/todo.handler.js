import { TodoData } from "./todo.data.js";

const findAll = () => {
    return TodoData.todoData;
};

const findById = (id) => {
    return TodoData.todoData.find((todo) => todo.id === id);
};

const add = (todo) => {
    const newTodo = {
        id: TodoData.todoData.length + 1,
        ...todo,
    };

    TodoData.todoData.push(newTodo);
    return newTodo;
};

const update = (id, todo) => {
    const index = findIndexById(id);
    console.info("target index : %d", index); // 여기서 -1이 반환되서 이상한 곳에 삽입됨

    const updated = {
        id,
        ...todo,
    };

    TodoData.todoData[index] = updated;
    console.info(TodoData.todoData);
    return updated;
};

const remove = (id) => {
    const index = findIndexById(id);
    // if (index === -1) {
    //   return {};
    // }

    const removed = TodoData.todoData[index];
    TodoData.todoData.splice(index, 1);
    return removed;
};

const findIndexById = (id) => {
    return TodoData.todoData.findIndex((todo) => todo.id === id);
};

export const TodoHandler = {
    findAll,
    findById,
    add,
    update,
    remove,
};
