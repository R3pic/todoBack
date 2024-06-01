import express from "express";
import { validationResult } from 'express-validator';

import {TodoHandlerRdbms as TodoHandler } from "./todo.handler.rdbms.js";
import createHttpError from "http-errors";
import {TodoValidator} from "./todo.validator.js";

const router = express.Router();

router
    .get('/', async (req, res, next) => {
        const allTodos = await TodoHandler.findAll();
        res.send(allTodos);
    })
    .post('/', TodoValidator, async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            const httpErr = createHttpError(400, "Validation Error");
            httpErr.errors = errors.array();
            next(httpErr);
            return;
        }

        const newTodo = await TodoHandler.add(req.body);
        res.status(200).send(newTodo);
    })
    .delete('/:id', async (req, res) => {
        const id = Number(req.params.id);
        const removeData = await TodoHandler.remove(id);
        console.info("삭제 요청", id, removeData);
        res.send(removeData);
    })
    .patch('/:id', TodoValidator, async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            const httpErr = createHttpError(400, "Validation Error");
            httpErr.errors = errors.array();
            next(httpErr);
            return;
        }
        const id = Number(req.params.id);
        const data = await TodoHandler.update(id, req.body);
        res.send(data);
    });

export default router;