import express from "express";
import { validationResult } from 'express-validator';

import {TodoHandlerMysql as TodoHandler } from "./todo.handler.mysql.js";
import {TodoValidator} from "./todo.validator.js";
import {errorCheck} from "../common/validationCheck.js";

const router = express.Router();

router
    .get('/', async (req, res, next) => {
        const allTodos = await TodoHandler.findAll();
        res.send(allTodos);
    })
    .post('/', TodoValidator, async (req, res, next) => {
        const errors = validationResult(req);
        errorCheck(errors, next);
        const newData = await TodoHandler.add(req.body);
        res.status(200).send(newData);
    })
    .delete('/:id', async (req, res) => {
        const id = Number(req.params.id);
        const removeData = await TodoHandler.remove(id);
        res.send(removeData);
    })
    .patch('/:id', TodoValidator, async (req, res, next) => {
        const errors = validationResult(req);
        errorCheck(errors, next);
        const id = Number(req.params.id);
        const updatedData = await TodoHandler.update(id, req.body);
        res.send(updatedData);
    });

export default router;