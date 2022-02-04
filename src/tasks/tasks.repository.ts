import { EntityRepository, Repository } from "typeorm";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{

    async createTask(createTaskDTO):Promise<Task>{
        const { title, description } = createTaskDTO;
        const task = this.create({title,description,status:TaskStatus.OPEN});
    
        await this.save(task);
        return task;
    }
    async getTasks(filterDTO:GetTasksFilterDTO):Promise<Task[]>{
        const {status,search} = filterDTO;
        const query  = this.createQueryBuilder('task');
        if(status){
            query.andWhere('task.status = :statusKey',{statusKey:'OPEN'})
        }
        if(search){
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',{search:`%${search}%`})
        }

        const tasks = await query.getMany();
        return tasks;
    }


}

