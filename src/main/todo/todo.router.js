import express from "express";
import {TodoHandlerRdbms as TodoHandler} from "./todo.handler.rdbms.js";

const Todorouter = express.Router();

Todorouter
  .get('/', async (req, res) => {
    const data = await TodoHandler.findAll();
    res.send(data);
  })
  .post('/', async (req, res) => {
    const body = req.body;
    await TodoHandler.add(body);
    res.status(201).send();
  })
  .delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const data = await TodoHandler.remove(id);
    res.send(data);
  })
  .patch('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const data = await TodoHandler.update(id, req.body);
    res.send(data);

  });


export default Todorouter;
