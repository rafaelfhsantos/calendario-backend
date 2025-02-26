import { Evento } from '../../entities/Evento';
import { AppDataSource } from '../../ormconfig';

export const listEventosService = async () => {
    const eventoRepository = AppDataSource.getRepository(Evento);
    const eventos = await eventoRepository.find();
    return eventos;
}