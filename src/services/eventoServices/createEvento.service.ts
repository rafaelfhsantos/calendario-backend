import { AppDataSource } from "../../ormconfig";
import { Evento } from "../../entities/Evento";
import { IEvento } from "../../interfaces/evento";
import { AppError } from "../../errors/appError";
import { isAfter, isBefore } from "date-fns";
import { User } from "../../entities/User";

export const createEventoService = async ({description,startTime,endTime,user_id}:IEvento): Promise<Evento> => {
    
        const eventoRepository = AppDataSource.getRepository(Evento);
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { id: user_id } });        
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const eventos = await eventoRepository.find({ where: { owner: { id: user_id } }});
        eventos.forEach(e => {            
            if (isBefore(startTime,e.endTime) && isAfter(endTime,e.startTime)) {
                throw new AppError('Event already exists for this date and time', 400);
            }
        });

        const eventosInvited = await eventoRepository.find({ where: { users: { id: user_id } }});
        eventosInvited.forEach(e => {            
            if (isBefore(startTime,e.endTime) && isAfter(endTime,e.startTime)) {
            throw new AppError('Event already exists for this date and time', 400);
            }
        });

        const newEvento = eventoRepository.create({
            description, 
            startTime, 
            endTime, 
            owner: user
        });
        await eventoRepository.save(newEvento);
        return newEvento;    
    
};