import { Evento } from '../../entities/Evento';
import { AppDataSource } from '../../ormconfig';

export const deleteEventoService = async (id: number, userId: number): Promise<void> => {

    const eventoRepository = AppDataSource.getRepository(Evento);

    const evento = await eventoRepository.findOne(
        { 
            where: { id: Number(id), 
            owner: { id: userId } } 
        });
    if (!evento) {
        throw new Error('Evento not found');
    }

    await eventoRepository.remove(evento);
};