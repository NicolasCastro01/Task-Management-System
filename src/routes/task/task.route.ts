import { Request, Response } from "express";
import { TaskController } from "@controllers/task/task.controller";
import { TaskService } from "~/services/task/task.service";
import { TaskRepository } from "~/repositories/task/task.repository";
import { PrismaClient } from "@prisma/client";

const express = require("express");
const router = express.Router();

const database = new PrismaClient();

const taskRepository = new TaskRepository(database);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.get('/api/tasks', async (request: Request, response: Response) => taskController.getAll(request, response));
router.get('/api/tasks/list', async (request: Request, response: Response) => taskController.getAllByFilter(request, response));
router.post('/api/tasks/create', async (request: Request, response: Response) => taskController.create(request, response));
router.patch('/api/tasks/:taskId/edit', async (request: Request, response: Response) => taskController.update(request, response));
router.patch('/api/tasks/:taskId/complete', async (request: Request, response: Response) => taskController.complete(request, response));
router.delete('/api/tasks/:taskId/delete', async (request: Request, response: Response) => taskController.delete(request, response));

export default router;