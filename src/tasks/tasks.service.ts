import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

  constructor (
    @InjectRepository(TasksRepository)
    private tasksRepository:TasksRepository){}

    public createTask(createTaskDTO: CreateTaskDTO,user:User): Promise<Task> {
      return this.tasksRepository.createTask(createTaskDTO,user);
  }
getTasks(filterDTO:GetTasksFilterDTO,user:User):Promise<Task[]>{
  return this.tasksRepository.getTasks(filterDTO,user);
}
  async getTaskById(id: string,user:User):Promise<Task> {
    const task  = await this.tasksRepository.findOne({
      where:{id,user}
    });
    if(!task){
      throw new NotFoundException(`Task with id "${id}" not found!`);
    }
    return task;
  }

    public async deleteTaskById(id: string, user:User): Promise<void> {
  const result = await this.tasksRepository.delete({id,user});
  if(result.affected === 0) throw new NotFoundException(`Task with id "${id}" not found!`);
  }

  public async updateTaskById(id: string, status: TaskStatus,user:User): Promise<Task> {
  const task = await this.getTaskById(id,user);
  task.status = status;
  await this.tasksRepository.save(task);
  return task;
  }

}
