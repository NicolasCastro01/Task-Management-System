import { Request, Response } from "express";
import { TaskController } from "@controllers/task/task.controller";

const express = require("express");
const router = express.Router();
const taskController = new TaskController();

router.get('/api/tasks', async (request: Request, response: Response) => taskController.getAll(request, response));
router.post('/api/tasks/create', async (request: Request, response: Response) => taskController.create(request, response));
router.patch('/api/tasks/:taskId/edit', async (request: Request, response: Response) => taskController.update(request, response));
router.delete('/api/tasks/:taskId/delete', async (request: Request, response: Response) => taskController.delete(request, response));

export default router;