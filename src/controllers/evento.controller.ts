import { NextFunction, Request, Response } from "express";
import { createEventoService } from "../services/eventoServices/createEvento.service";
import { listEventosService } from "../services/eventoServices/listEventos.service";
import { listOneEventoService } from "../services/eventoServices/listOneEvento.service";
import { AppError } from "../errors/appError";


export const createEventoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("📩 Dados recebidos no registro:", req.body);    
        const { description,startTime,endTime} = req.body;
        const user_id = req.body.user_id; // Obtém o user_id do token
        if (!user_id) {
            throw new AppError("Usuário não autenticado", 401);
          }
      
          if (!description || !startTime || !endTime) {
            throw new AppError("Todos os campos são obrigatórios!", 400);
          }
        
        const createdEvento = await createEventoService({ description,startTime,endTime,user_id});
        res.status(201).json(createdEvento);  
    }catch(error){
        next(error);
    }
          
}

export const listEventosController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventos = await listEventosService();  
        res.status(200).json(eventos);
    }catch(error){
        next(error);
    }    
}

export const listOneEventoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id} = req.params;
        console.log("🔍 Buscando evento com com id:", id);    
        const evento = await listOneEventoService(Number(id));    
        res.status(200).json(evento);
    }catch(error){
        next(error);
    }
}


