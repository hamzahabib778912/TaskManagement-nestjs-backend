import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : string;

    console.log("Branch updated")


    @Column()
    username : string;

    @Column()
    password:string;

}