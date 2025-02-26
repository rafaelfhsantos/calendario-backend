import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("eventos")
export class Evento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @ManyToOne(() => User, (user) => user.id)
    user: User;
}
