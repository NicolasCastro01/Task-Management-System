import 'express-async-errors';
import express from "express";
import cookieParser from "cookie-parser";
import TaskRoute from "~/routes/task/task.route";
import AuthRoute from "~/routes/auth/auth.route";
import { ErrorHandler } from "./middleware/error-handler/error-handler";
import { AuthMiddleware } from './middleware/auth/auth.middleware';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', AuthRoute);

app.use(AuthMiddleware.init);
app.use('/api/tasks', TaskRoute);

app.use(ErrorHandler.init);

app.listen(port, () => {
    console.clear();
    console.log('[⚙️] > Server on!');
});