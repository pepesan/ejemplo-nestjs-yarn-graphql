import { HttpException, Injectable } from '@nestjs/common';
import { Task, TASKS } from './models/task';
import { AddTaskInput } from './dto/add-task.input';

@Injectable()
export class TasksService {
  tasks = TASKS;

  getTasks() {
    return this.tasks;
  }

  getTask(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
  async addTask(input: AddTaskInput): Promise<Task[]> {
    const lastTask = this.tasks.slice(-1).pop();
    const task: Task = {
      id: lastTask.id + 1,
      title: input.title,
      description: input.description,
      completed: false,
    };

    this.tasks.push(task);
    return this.tasks;
  }
  updateTask(id: string, inputTask: AddTaskInput) {
    const objIndex = this.tasks.findIndex((obj) => obj.id == id);
    delete this.tasks[objIndex];
    const lastTask = this.tasks.slice(-1).pop();
    const task = {
      id: lastTask.id + 1,
      title: inputTask.title,
      description: inputTask.description,
      completed: false,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): Task[] {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    if (taskIndex === -1) {
      throw new HttpException('Task not found', 404);
    }

    this.tasks.splice(taskIndex, 1);
    return this.tasks;
  }
}
