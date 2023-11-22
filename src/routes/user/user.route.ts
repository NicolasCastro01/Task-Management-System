import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserController } from "~/controllers/user/user.controller";
import { UserRepository } from "~/repositories/user/user.repository";
import { JwtService } from "~/services/Jwt/jwt.service";
import { UserService } from "~/services/user/user.service";

const express = require("express");
const router = express.Router();

const database = new PrismaClient();
const jwtService = new JwtService();
const userRepository = new UserRepository(database);
const userService = new UserService(userRepository);
const userController = new UserController(userService, jwtService);


router.get('/data', async (request: Request, response: Response) => userController.getInfo(request, response));

export default router;