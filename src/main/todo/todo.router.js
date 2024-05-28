import express from "express";

import {TodoHandlerRdbms as TodoHandler } from "./todo.handler.rdbms.js";
import { TodoValidator } from "./todo.validator.js";

const router = express.Router();

router
    .get('/', async (req, res) => {
        const allTodos = await TodoHandler.findAll();
        res.send(allTodos);
    })
    .post('/', TodoValidator.TodoDtoValidator, async (req, res) => {
        const newTodo = await TodoHandler.add(req.body);
        res.status(201).send(newTodo); // 201번인데 반환값이 있어도 되나? => 프론트에서 id를 직접생성하면 백엔드에서 id를 관리할 수 없어서 id값을 붙인 TODO를 반환하기 위해서....
    })
    .delete('/:id', async (req, res) => {
        const id = Number(req.params.id);
        const removeData = await TodoHandler.remove(id);
        console.info("삭제 요청", id, removeData);
        res.send(removeData);
    })
    .patch('/:id', TodoValidator.TodoDtoValidator, async (req, res) => {
        // if ID의 번호가 데이터베이스에 없을 경우에는?
        const id = Number(req.params.id);
        const data = await TodoHandler.update(id, req.body);
        res.send(data);
    });

export default router;