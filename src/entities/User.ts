import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
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
    
    // Relacionamento com os eventos onde o usuário é dono
  @OneToMany(() => Evento, evento => evento.owner)
  eventosOwned: Evento[];

  // Relacionamento com os eventos onde o usuário é convidado
  @ManyToMany(() => Evento, evento => evento.users)
  eventosInvited: Evento[];
}
