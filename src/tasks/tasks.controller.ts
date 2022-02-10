import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTask(@Query() filterDto: GetTasksFilterDTO,@GetUser() user:User): Promise<Task[]> {

      return this.tasksService.getTasks(filterDto,user);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO,@GetUser() user:User): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO,user);
  }

    @Get('/:id')
  getTaskById(@Param('id') id: string,@GetUser() user:User): Promise<Task> {
    return this.tasksService.getTaskById(id,user);
  };

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string,@GetUser() user:User): Promise<void> {
    return this.tasksService.deleteTaskById(id,user);
  }
  @Patch('/:id')
  updateTaskById(@Param('id') id: string, @Body() updateTaskStatusDTO:UpdateTaskStatusDTO,@GetUser() user:User): Promise<Task> {
      const {status} = updateTaskStatusDTO;
    return this.tasksService.updateTaskById(id, status,user);
  }
}
