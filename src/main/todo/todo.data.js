const todoData = [];

const initData = [
    {
        id: 1, // int
        title: "First Todo",
        status: "unreached",
    },
    {
        id: 2,
        title: "Second Todo",
        status: "reached",
    },
    {
        id: 3,
        title: "Third Todo",
        status: "unreached",
    },
    {
        id: 4,
        title: "Fourth Todo",
        status: "reached",
    },
    {
        id: 5,
        title: "Fifth Todo",
        status: "reached",
    },
];

const init = () => {
    TodoData.todoData = [...initData]
}

export const TodoData = {
    todoData,
    init
}