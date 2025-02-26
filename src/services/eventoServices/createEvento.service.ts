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

        // verificar se o evento sobrepoem outro evento em data e hora

        // description: string;
        // startTime: Date;
        // endTime: Date;
        // user_id: string;


        const eventos = await eventoRepository.find({ where: { user: { id: user_id } }});
        eventos.forEach(e => {            
            if (isBefore(startTime,e.endTime) && isAfter(endTime,e.startTime)) {
                throw new AppError('Event already exists for this date and time', 400);
            }
        });

        // criar o evento com o usuário logado

        const newEvento = eventoRepository.create({
            description, 
            startTime, 
            endTime, 
            user
        });
        await eventoRepository.save(newEvento);
        return newEvento;
    
    // catch (error) {
    //     throw new AppError('Error creating evento: ' + error, 400);
    // }
};