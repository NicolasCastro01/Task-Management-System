import { describe, it } from "@jest/globals";
import { TaskRepositoryMemo } from "../memory/task/task.repository";
import { FiltersEnum } from "../../enum/task/filters";
import { Task } from "../../core/task";

const makeSut = () => {
    const database: Task[] = [];

    return {
        TaskRepositoryMemory: new TaskRepositoryMemo(database)
    };
}

describe('TaskRepository', () => {

    describe('getAll', () => {
        it('should return all persisted tasks', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const tasks = await TaskRepositoryMemory.getAll();
            expect(tasks.length).toEqual(0);
        })
    });

    describe('getAllByUserId', () => {
        it('should return all user tasks', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const userFakeId = 1;
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, userFakeId);

            await TaskRepositoryMemory.create(task);

            const tasks: Task[] = await TaskRepositoryMemory.getAllByUserId(userFakeId);
            expect(tasks[0].userRef).toEqual(userFakeId);
        });
    });

    describe('getAllByFilter', () => {
        it('should return all tasks by status pending', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);

            await TaskRepositoryMemory.create(task);

            const filterSelected = FiltersEnum.status;
            const tasks: Task[] = await TaskRepositoryMemory.getAllByFilter(filterSelected, 'pending');

            expect(tasks.length).toEqual(1);
        })

        it('should return all tasks by status completed', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);
            const taskCreated: Task = await TaskRepositoryMemory.create(task);

            await TaskRepositoryMemory.complete(taskCreated._id);

            const filterSelected = FiltersEnum.status;
            const tasks: Task[] = await TaskRepositoryMemory.getAllByFilter(filterSelected, 'completed');

            expect(tasks.length).toEqual(1);
        })

        it('should return all tasks by finish at', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const finishAt = new Date();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: finishAt
            }, 0);
            await TaskRepositoryMemory.create(task);

            const filterSelected = FiltersEnum.finishAt;
            const tasks: Task[] = await TaskRepositoryMemory.getAllByFilter(filterSelected, finishAt.toISOString());

            expect(tasks.length).toEqual(1);
        })
    });

    describe('findById', () => {
        it('should return a persisted task', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);
            const createdTask: Task = await TaskRepositoryMemory.create(task);

            const taskPersisted: Task = await TaskRepositoryMemory.findById(createdTask._id);

            expect(taskPersisted._id).toEqual(createdTask._id);
        });

        it('should not return a persisted task', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);
            const createdTask: Task = await TaskRepositoryMemory.create(task);

            try {
                await TaskRepositoryMemory.findById(createdTask._id + 1);

                expect(true).toBe("Resource should be not found.");
            } catch (error) {
                expect(error.message).toEqual("Resource not found.");
                expect(error._details[0].field).toEqual("task");
                expect(error.statusCode).toEqual(422);
            }
        });
    });

    describe('create', () => {
        it('should create a task', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);
            const createdTask: Task = await TaskRepositoryMemory.create(task);

            expect(createdTask.title).toEqual(task.title);
            expect(createdTask.description).toEqual(task.description);
            expect(createdTask.finishAt).toEqual(task.finishAt);
            expect(createdTask.userRef).toEqual(task.userRef);
        })
    });

    describe('delete', () => {
        it('should delete a task', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);

            const createdTask: Task = await TaskRepositoryMemory.create(task);

            await TaskRepositoryMemory.delete(createdTask);

            try {
                await TaskRepositoryMemory.findById(createdTask._id);

                expect(true).toBe("Resource should be not found.");
            } catch (error) {
                expect(error.message).toEqual("Resource not found.");
                expect(error._details[0].field).toEqual("task");
                expect(error.statusCode).toEqual(422);
            }
        });
    });

    describe('update', () => {
        describe('should update a task', () => {
            it('update title', async () => {
                const { TaskRepositoryMemory } = makeSut();
                const task = Task.create({
                    title: '',
                    description: '',
                    finishAt: new Date()
                }, 0);
                const createdTask: Task = await TaskRepositoryMemory.create(task);

                const taskUpdate: Task = Task.restore({
                    id: createdTask._id,
                    title: 'trocado',
                    description: createdTask.description,
                    status: createdTask._status,
                    finishAt: createdTask.finishAt
                }, createdTask.userRef);

                await TaskRepositoryMemory.update(taskUpdate, taskUpdate._id);

                const updatedTask: Task = await TaskRepositoryMemory.findById(taskUpdate._id);

                expect(updatedTask.title).toEqual(taskUpdate.title);
            });

            it('update description', async () => {
                const { TaskRepositoryMemory } = makeSut();
                const task = Task.create({
                    title: '',
                    description: '',
                    finishAt: new Date()
                }, 0);
                const createdTask: Task = await TaskRepositoryMemory.create(task);

                const taskUpdate: Task = Task.restore({
                    id: createdTask._id,
                    title: createdTask.title,
                    description: 'trocado',
                    status: createdTask._status,
                    finishAt: createdTask.finishAt
                }, createdTask.userRef);

                await TaskRepositoryMemory.update(taskUpdate, taskUpdate._id);

                const updatedTask: Task = await TaskRepositoryMemory.findById(taskUpdate._id);

                expect(updatedTask.description).toEqual(taskUpdate.description);
            });

            it('update finishAt', async () => {
                const { TaskRepositoryMemory } = makeSut();
                const task = Task.create({
                    title: '',
                    description: '',
                    finishAt: new Date(new Date().setSeconds(20))
                }, 0);
                const createdTask: Task = await TaskRepositoryMemory.create(task);

                const updateFinishAtDate = new Date(new Date().setSeconds(10));
                const taskUpdate: Task = Task.restore({
                    id: createdTask._id,
                    title: createdTask.title,
                    description: createdTask.description,
                    status: createdTask._status,
                    finishAt: updateFinishAtDate
                }, createdTask.userRef);

                await TaskRepositoryMemory.update(taskUpdate, taskUpdate._id);

                const updatedTask: Task = await TaskRepositoryMemory.findById(taskUpdate._id);

                expect(updatedTask.finishAt.toISOString()).not.toEqual(createdTask.finishAt.toISOString());
            });
        });

        it('should not update a task', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);
            const createdTask: Task = await TaskRepositoryMemory.create(task);

            const taskUpdate: Task = Task.restore({
                id: createdTask._id,
                title: 'trocado',
                description: createdTask.description,
                status: createdTask._status,
                finishAt: createdTask.finishAt
            }, createdTask.userRef);

            try {
                await TaskRepositoryMemory.update(taskUpdate, taskUpdate._id + 1);

                expect(true).toBe("Task cannot be updated.");
            } catch (error) {
                expect(error.message).toEqual("Resource not found.");
                expect(error._details[0].field).toEqual("updatedTask");
                expect(error.statusCode).toEqual(422);
            }
        })
    });


    describe('complete', () => {
        it('should complete a task', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);
            const createdTask: Task = await TaskRepositoryMemory.create(task);

            await TaskRepositoryMemory.complete(createdTask._id);

            const completedTask: Task = await TaskRepositoryMemory.findById(createdTask._id);

            expect(completedTask._status._props.description).toEqual('completed');
            expect(completedTask._status._id).toEqual(2);
        });

        it('should not complete a task', async () => {
            const { TaskRepositoryMemory } = makeSut();
            const task = Task.create({
                title: '',
                description: '',
                finishAt: new Date()
            }, 0);
            const createdTask: Task = await TaskRepositoryMemory.create(task);

            try {
                await TaskRepositoryMemory.complete(createdTask._id + 1);
                expect(true).toBe("Task cannot be complete.");
            } catch (error) {
                expect(error.message).toEqual("Resource not found.");
                expect(error._details[0].field).toEqual("task");
                expect(error.statusCode).toEqual(422);
            }
        });
    });
});

