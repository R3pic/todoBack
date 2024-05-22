import express from "express";

import {TodoHandlerRdbms as TodoHandler } from "./todo.handler.rdbms.js";

const router = express.Router();

router
    .get('/', (req, res) => {
        const data = TodoHandler.findAll();
        res.send(data);
    })
    .post('/', (req, res) => {
        const body = req.body;
        TodoHandler.add(body);
        res.status(201)
        res.send();
    })
    .delete('/:id', (req, res) => {
        const id = Number(req.params.id);
        res.send(TodoHandler.remove(id));
    })
    .patch('/:id', (req, res) => {
        const id = Number(req.params.id); // string
        console.info(id, req.body);
        const data = TodoHandler.update(id, req.body);
        res.send(data);
    })

export default router;