import { AppDataSource } from "../ormconfig";
import { Evento } from "../entities/Evento";

export const EventoRepository = AppDataSource.getRepository(Evento);