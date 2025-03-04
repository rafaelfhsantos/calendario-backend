import { isAfter, isBefore } from 'date-fns';
import { Evento } from '../../entities/Evento';
import { AppDataSource } from '../../ormconfig';
import { AppError } from '../../errors/appError';
import { User } from '../../entities/User';


export const inviteEventoService = async (
    user_email: string,
    evento_id: string,
    owner_id: number
): Promise<Evento | null> => {
    const eventoRepository = AppDataSource.getRepository(Evento);
    const userRepository = AppDataSource.getRepository(User);
  
    const evento = await eventoRepository.findOne(
        { 
            where: { 
                id: Number(evento_id), 
                owner: { id: owner_id } 
            },relations: ["owner", "users"] 
        });
    if (!evento) {
        throw new Error('Evento not found');
    }   
    
    const guest = await userRepository.findOne({ where: { email: user_email } });
    if (!guest) {
        throw new AppError('Guest User not found', 404);
    }    

    const eventos = await eventoRepository.find({ where: { owner: { id: guest.id } }});
    eventos.forEach(e => {            
        if (isBefore(evento.startTime,e.endTime) && isAfter(evento.endTime,e.startTime)) {
            throw new AppError('Guest already has events in this date', 400);
        }
    });

    const eventosInvited = await eventoRepository.find({ where: { users: { id: guest.id } }});
    eventosInvited.forEach(e => {            
        if (isBefore(evento.startTime,e.endTime) && isAfter(evento.endTime,e.startTime)) {
            throw new AppError('Guest already has events in this date', 400);
        }
    });        

    evento.users.push(guest);    

    await eventoRepository.save(evento);   

    return evento;
};