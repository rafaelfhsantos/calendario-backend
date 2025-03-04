import { NextFunction, Request, Response } from "express";
import { createEventoService } from "../services/eventoServices/createEvento.service";
import { listEventosService } from "../services/eventoServices/listEventos.service";
import { listOneEventoService } from "../services/eventoServices/listOneEvento.service";
import { AppError } from "../errors/appError";
import { listMyEventosService } from "../services/eventoServices/listMyEventos.service";
import { deleteEventoService } from "../services/eventoServices/deleteEvento.service";
import { updateEventoService } from "../services/eventoServices/updateEvento.service";
import { inviteEventoService } from "../services/eventoServices/inviteEventoService";
import { listMyInvitationsService } from "../services/eventoServices/listMyInvitations.service";
import { denyInviteService } from "../services/eventoServices/denyInvite.service";
import { cancelInviteService } from "../services/eventoServices/cancelInvite.service";


export const createEventoController = async (req: Request, res: Response, next: NextFunction) => {
    try {           
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

export const listMyEventosController = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const user_id = req.body.user_id; // Obtém o user_id do token
        const eventos = await listMyEventosService(user_id);  
        res.status(200).json(eventos);
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
        const {id} = req.params;          
        const evento = await listOneEventoService(Number(id));    
        res.status(200).json(evento);
    }catch(error){
        next(error);
    }
}

export const deleteEventoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user_id = req.body.user_id;
        
        const evento = await deleteEventoService(Number(id), user_id);
        res.status(200).json(evento);
    } catch (error) {
        next(error);
    }
}

export const updateEventoController = async (req: Request, res: Response, next: NextFunction) => {
    try {    
        const { id } = req.params;
        const { description,startTime,endTime} = req.body;
        const user_id = req.body.user_id; // Obtém o user_id do token
        if (!user_id) {
            throw new AppError("Usuário não autenticado", 401);
        }
      
        if (!description || !startTime || !endTime) {
            throw new AppError("Todos os campos são obrigatórios!", 400);
        }
        
        const createdEvento = await updateEventoService(id, { description,startTime,endTime}, user_id);
        res.status(201).json(createdEvento);
    }catch(error){
        next(error);
    } 
}

export const inviteEventoController = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const { user_email, evento_id } = req.params;        
        const owner_id = req.body.user_id; // Obtém o user_id do token
        if (!owner_id) {
            throw new AppError("Usuário não autenticado", 401);
        }
      
        if (!user_email) {
            throw new AppError("Email é obrigatório!", 400);
        }
        
        const invite = await inviteEventoService(user_email, evento_id, owner_id);        
        res.status(201).json(invite);        

    }catch(error){
        console.log("Erro no inviteEventoController: ", error);
        next(error);

    } 
}

export const listMyInvitationsController = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const user_id = req.body.user_id; 
        if (!user_id) {
            throw new AppError("Usuário não autenticado", 401);
        }
        const eventosInvited = await listMyInvitationsService(user_id);
        res.status(200).json(eventosInvited);

    } catch(error){
        console.log("Erro no listMyInvitationsController: ", error);
        next(error);
    }
}

export const denyInviteController = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const { evento_id } = req.params;        
        const user_id = req.body.user_id; 
        if (!user_id) {
            throw new AppError("Usuário não autenticado", 401);
        }

        const denyInvite = await denyInviteService(evento_id, user_id);
        res.status(201).json(denyInvite);
        
    }catch(error){
        console.log("Erro no denyInviteController: ", error);
        next(error);
    } 
}


export const cancelInviteController = async (req: Request, res: Response, next: NextFunction) => {
    try {           
        const evento_id = Number (req.params.evento_id);     
        const guest_id = Number (req.params.guest_id);     
        const user_id = Number (req.body.user_id); 
        if (!user_id) {
            throw new AppError("Usuário não autenticado", 401);
        }
        
        const cancelInvite = await cancelInviteService(evento_id, user_id, guest_id);
        res.status(201).json(cancelInvite);        

    }catch(error){
        console.log("Erro no cancelInviteController: ", error);
        next(error);
    } 
}


