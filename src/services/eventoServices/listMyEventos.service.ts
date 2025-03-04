import { Evento } from '../../entities/Evento';
import { User } from '../../entities/User';
import { AppDataSource } from '../../ormconfig';

export const listMyEventosService = async (user_id: number) => {
    const eventoRepository = AppDataSource.getRepository(Evento);
    const userRepository = AppDataSource.getRepository(User);

    const owner = await userRepository.findOneBy({id : user_id});
    if (!owner) {
        throw new Error('User not found');
    }

    const eventos = await eventoRepository.find({
        where: { owner },
        relations: ["users"]
      });    

    return eventos;
};