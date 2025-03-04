import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
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
  

    @ManyToOne(() => User, user => user.eventosOwned)
  @JoinColumn({ name: "owner_id" })
  owner: User; // Relacionamento com o dono do evento

  @ManyToMany(() => User, user => user.eventosInvited)
  @JoinTable() // Tabela intermediária para os convidados
  users: User[];
}
