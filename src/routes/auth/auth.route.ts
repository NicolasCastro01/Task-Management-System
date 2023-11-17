import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "~/repositories/user/user.repository";
import { UserService } from "~/services/user/user.service";
import { JwtService } from "~/services/Jwt/jwt.service";
import { AuthController } from "~/controllers/auth/auth.controller";

const express = require("express");
const router = express.Router();

const database = new PrismaClient();

const userRepository = new UserRepository(database);
const userService = new UserService(userRepository);
const jwtService = new JwtService();
const authController = new AuthController(jwtService, userService);

router.post('/login', async (request: Request, response: Response) => authController.login(request, response));
router.post('/register', async (request: Request, response: Response) => authController.register(request, response));

export default router;