import express from "express";
import TaskRoute from "~/routes/task/task.route";

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/', TaskRoute);

app.listen(port, () => {
    console.clear();
    console.log('[⚙️] > Server on!');
});

// [x] - Criar uma nova tarefa com um título, uma descrição e uma data de vencimento.
// [x] - Listar todas as tarefas.
// [x] - Marcar uma tarefa como concluída.
// [x] - Editar o título, descrição ou data de vencimento de uma tarefa.
// [x] - Excluir uma tarefa.
// [x] - Filtrar tarefas por status (concluídas ou pendentes).
// [x] - Filtrar tarefas por data de vencimento.

// [x] - Implementar o Prisma.
// [x] - Banco de dados postgres.
// [x] - Modelar a tarefa para o banco.