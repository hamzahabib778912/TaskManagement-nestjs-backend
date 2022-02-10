import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : string;


    @Column({unique:true})
    username : string;

    @Column()
    password:string;

    @OneToMany(_type=>Task,task=>task.user,{eager:true})
    tasks :Task[];

    //arrow function in argument is the type of the property, hwo to access this from other side(relation)
    // eager true means whebenever we get a user, we'' gte its tasks as well
}