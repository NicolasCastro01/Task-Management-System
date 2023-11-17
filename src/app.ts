import 'express-async-errors';
import express from "express";
import TaskRoute from "~/routes/task/task.route";
import AuthRoute from "~/routes/auth/auth.route";
import { ErrorHandler } from "./middleware/error-handler/error-handler";
import dotenv from "dotenv";
import { AuthMiddleware } from './middleware/auth/auth.middleware';
dotenv.config();

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/api/auth', AuthRoute);

app.use(AuthMiddleware.init);
app.use('/api/tasks', TaskRoute);

app.use(ErrorHandler.init);

app.listen(port, () => {
    console.clear();
    console.log('[⚙️] > Server on!');
});

// Authentication
// [x] - Modelar usuário no prisma
// [x] - Criar sistema de cadastro
// [x] - Criar sistema de login