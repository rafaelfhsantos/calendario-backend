import { isAfter, isBefore } from 'date-fns';
import { Evento } from '../../entities/Evento';
import { IEventoUpdate } from '../../interfaces/evento';
import { AppDataSource } from '../../ormconfig';
import { AppError } from '../../errors/appError';

export const updateEventoService = async (
    id: string, 
    {description,
    startTime,
    endTime,
    }: IEventoUpdate, 

    userId: number
): Promise<Evento | null> => {
    const eventoRepository = AppDataSource.getRepository(Evento);

    const evento = await eventoRepository.findOne(
        { 
            where: { id: Number(id), 
            owner: { id: userId } } 
        });
    if (!evento) {
        throw new Error('Evento not found');
    }

    if (!evento) {
        return null;
    }

    evento.description = description;
    evento.startTime = startTime;
    evento.endTime = endTime;

    const eventos = await eventoRepository.find({ where: { owner: { id: userId } }});
    eventos.forEach(e => {            
        if (isBefore(startTime,e.endTime) && isAfter(endTime,e.startTime) && e.id != evento.id) {            
            throw new AppError('Event already exists for this date and time', 400);
        }
    })

    const eventosInvited = await eventoRepository.find({ where: { users: { id: userId} }});
    eventosInvited.forEach(e => {            
        if (isBefore(startTime,e.endTime) && isAfter(endTime,e.startTime) && e.id != evento.id) { 
            throw new AppError('Event already exists for this date and time', 400);
        }
    });

    await eventoRepository.save(evento);    

    return evento;
};