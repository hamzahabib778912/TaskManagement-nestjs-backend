import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor (
    @InjectRepository(TasksRepository)
    private tasksRepository:TasksRepository){}

    public createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
      return this.tasksRepository.createTask(createTaskDTO);
  }
getTasks(filterDTO:GetTasksFilterDTO):Promise<Task[]>{
  return this.tasksRepository.getTasks(filterDTO);
}
  async getTaskById(id: string):Promise<Task> {
    const task  = await this.tasksRepository.findOne(id);
    if(!task){
      throw new NotFoundException(`Task with id "${id}" not found!`);
    }
    return task;
  }

    public async deleteTaskById(id: string): Promise<void> {
  const result = await this.tasksRepository.delete(id);
  if(result.affected === 0) throw new NotFoundException(`Task with id "${id}" not found!`);
  }

  public async updateTaskById(id: string, status: TaskStatus): Promise<Task> {
  const task = await this.getTaskById(id);
  task.status = status;
  await this.tasksRepository.save(task);
  return task;
  }

}