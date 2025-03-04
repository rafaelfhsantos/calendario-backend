import { Evento } from '../../entities/Evento';
import { User } from '../../entities/User';
import { AppDataSource } from '../../ormconfig';

export const listMyInvitationsService = async (user_id: number) => {
    const eventoRepository = AppDataSource.getRepository(Evento);
    const userRepository = AppDataSource.getRepository(User);

    const owner = await userRepository.findOneBy({id : user_id});
    if (!owner) {
        throw new Error('User not found');
    }

    const eventosInvited = await eventoRepository.find({
        relations: ["owner", "users"],
        where: {
          users: { id: user_id }
        }
    });
    
         
    return eventosInvited;
};