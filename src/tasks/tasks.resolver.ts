import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { AddTaskInput } from './dto/add-task.input';
// import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './models/task';
import { PubSub } from 'apollo-server-express';



@Resolver((of) => 'Tasks')
export class TasksResolver {
  private pubSub = new PubSub();
  constructor(private readonly taskService: TasksService) {}

  @Subscription((returns) => Task)
  async taskAdded() {
    return this.pubSub.asyncIterator('taskAdded');
  }
  /*
   Consulta
   Ejemplo:
   query {
    getTasks{
      id, title
    }
   }
   */
  @Query((type) => [Task])
  async getTasks() {
    return this.taskService.getTasks();
  }

  /*
    Read by ID

    Ejemplo Consulta:
    query{
      getTask(id: "1"){
        id, title, description
      }
    }
   */
  @Query((type) => Task)
  async getTask(@Args('id') id: string) {
    return this.taskService.getTask(id);
  }
  /*
  Añadir
  Ejemplo Mutación
  mutation{
    addTask(input:{
      title: "uno",
      description:"desc"
    }){
      id,
      title,
      description
    }
  }
   */
  @Mutation((type) => Task)
  async addTask(@Args('input') input: AddTaskInput) {
    const taskAdded = await this.taskService.addTask(input);
    console.log(taskAdded);
    await this.pubSub.publish('taskAdded', { taskAdded: taskAdded });
    return taskAdded;
  }
  /*
    Edit By ID
    Ejemplo de Consulta:
    mutation{
        updateTask(id: "1", input:{
          title: "unomod",
          description:"desc mod "
        }){
          id,
          title,
          description
        }
      }
   */
  @Mutation((type) => Task)
  async updateTask(@Args('id') id: string, @Args('input') input: AddTaskInput) {
    return this.taskService.updateTask(id, input);
  }
  /*
    Delete by ID
    Ejemplo de mutación:
    mutation{
      deleteTask(id: "1"){
        id, title
      }
    }
   */
  @Mutation((type) => [Task])
  async deleteTask(@Args('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
