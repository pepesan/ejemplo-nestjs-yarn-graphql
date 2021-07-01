import { HttpException, Injectable } from '@nestjs/common';
import { Task, TASKS } from './models/task';
import { AddTaskInput } from './dto/add-task.input';

@Injectable()
export class TasksService {
  tasks: Task[] = TASKS;

  getTasks() {
    return this.tasks;
  }

  getTask(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
  async addTask(input: AddTaskInput): Promise<Task> {
    const lastTask = this.tasks.slice(-1).pop();
    const fecha = new Date(input.creationDate);
    // console.log(fecha);
    const task: Task = new Task(
      lastTask.id + 1,
      input.title,
      input.description,
      false,
    );

    this.tasks.push(task);
    return task;
  }
  updateTask(id: string, inputTask: AddTaskInput) {
    // console.log(inputTask);
    // console.log(this.tasks);
    this.tasks = this.tasks.map((item) => {
      if (item.id === id) {
        // console.log('encontrado');
        return new Task(
          id,
          inputTask.title,
          inputTask.description,
          inputTask.completed,
        );
      }
    });
    // console.log(this.tasks);
    const objIndex = this.tasks.findIndex((obj) => obj.id == id);
    return this.tasks[objIndex];
  }
  deleteTask(id: string): Task {
    const index = this.tasks.findIndex((item) => item.id === id);
    const tarea = this.tasks[index];
    // console.log(tarea);
    // console.log(this.tasks);
    this.tasks.splice(index, 1);
    // console.log(this.tasks);
    //console.log(tarea);
    return tarea;
  }
}
