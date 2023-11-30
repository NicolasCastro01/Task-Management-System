import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TaskController } from "@controllers/task/task.controller";
import { TaskService } from "~/services/task/task.service";
import { TaskRepository } from "~/repositories/task/task.repository";
import { UserRepository } from "~/repositories/user/user.repository";
import { JwtService } from "~/services/Jwt/jwt.service";

const express = require("express");
const router = express.Router();

const database = new PrismaClient();

const taskRepository = new TaskRepository(database);
const userRepository = new UserRepository(database);
const jwtService = new JwtService();
const taskService = new TaskService(taskRepository, userRepository);
const taskController = new TaskController(taskService, jwtService);

router.get('/', async (request: Request, response: Response) => taskController.getAll(request, response)); 
router.get('/:taskId', async (request: Request, response: Response) => taskController.getById(request, response)); 
router.get('/list', async (request: Request, response: Response) => taskController.getAllByFilter(request, response));
router.post('/create', async (request: Request, response: Response) => taskController.create(request, response));
router.patch('/:taskId/edit', async (request: Request, response: Response) => taskController.update(request, response));
router.patch('/:taskId/complete', async (request: Request, response: Response) => taskController.complete(request, response));
router.delete('/:taskId', async (request: Request, response: Response) => taskController.delete(request, response));

export default router;