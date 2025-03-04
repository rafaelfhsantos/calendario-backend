import { Evento } from '../../entities/Evento';
import { AppDataSource } from '../../ormconfig';
import { AppError } from '../../errors/appError';
import { User } from '../../entities/User';


export const cancelInviteService = async (    
    evento_id: number,
    user_id: number,
    guest_id:number
): Promise<Evento | null> => {
    if (!evento_id || isNaN(Number(evento_id))) {
        throw new AppError("Invalid evento_id", 400);
    }
    if (!user_id || isNaN(Number(user_id))) {
        throw new AppError("Invalid user_id", 400);
    }
    if (!guest_id || isNaN(Number(guest_id))) {
        throw new AppError("Invalid guest_id", 400);
    }

    const eventoRepository = AppDataSource.getRepository(Evento);
    const userRepository = AppDataSource.getRepository(User);    

    const evento = await eventoRepository.findOne(
        { where: { id: Number(evento_id)},
        relations: ["owner", "users"]     
    });

    if (!evento) {
        throw new Error('Evento not found');
    }   
    
    const guest = await userRepository.findOne({ where: { id: Number(guest_id) } });
    if (!guest) {
        throw new AppError('Guest User not found', 404);
    }      

    evento.users = evento.users.filter(user => user.id !== guest.id);    

    await eventoRepository.save(evento);

    return evento;
};