import { Evento } from '../../entities/Evento';
import { AppError } from '../../errors/appError';
import { AppDataSource } from '../../ormconfig';

export const listOneEventoService = async (id: number) => {
    const eventoRepository = AppDataSource.getRepository(Evento);
    const evento = await eventoRepository.findOneBy({id : id});
    if (!evento) {
        throw new AppError("Evento not found", 404);
      }
    return evento;
}