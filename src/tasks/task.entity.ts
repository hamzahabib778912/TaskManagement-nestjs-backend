import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task{
@PrimaryGeneratedColumn()
id:string;

@Column( )
title:string;
@Column()
description:string;

@Column()
status:TaskStatus;

@ManyToOne(type=>User,(user)=>user.tasks,{eager:false})
@Exclude({toPlainOnly:true}) // whenever want to print this, fetch this. We'll exclude this property
user:User

}