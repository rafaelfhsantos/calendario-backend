import { Evento } from '../../entities/Evento';
import { AppDataSource } from '../../ormconfig';
import { AppError } from '../../errors/appError';
import { User } from '../../entities/User';

export const denyInviteService = async (    
    evento_id: string,
    user_id: number
): Promise<Evento | null> => {
    const eventoRepository = AppDataSource.getRepository(Evento);
    const userRepository = AppDataSource.getRepository(User); 
    
    const evento = await eventoRepository.findOne(
        { where: { id: Number(evento_id)},
        relations: ["owner", "users"]
    });
    if (!evento) {
        throw new Error('Evento not found');
    }   
    
    const guest = await userRepository.findOne({ where: { id: user_id } });
    if (!guest) {
        throw new AppError('Guest User not found', 404);
    }

    

    evento.users = evento.users.filter(user => user.id !== guest.id);    

    await eventoRepository.save(evento);    

    return evento;
};