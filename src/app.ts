import express from "express";
import TaskRoute from "~/routes/task/task.route";

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/api/tasks', TaskRoute);

app.listen(port, () => {
    console.clear();
    console.log('[⚙️] > Server on!');
});