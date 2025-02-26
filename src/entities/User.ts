import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Evento } from "./Evento";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Evento, (evento) => evento.user)
    eventos: Evento[];
}
