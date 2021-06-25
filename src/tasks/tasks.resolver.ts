import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { AddTaskInput } from './dto/add-task.input';
// import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './models/task';

@Resolver('Tasks')
export class TasksResolver {
  constructor(private readonly taskService: TasksService) {}
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
  @Mutation((type) => [Task])
  async addTask(@Args('input') input: AddTaskInput) {
    return this.taskService.addTask(input);
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
