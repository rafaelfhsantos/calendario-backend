import {NextFunction, Request, Response} from 'express';
import {createUserService} from '../services/userServices/createUser.service';
import { listUserService, listUsersService } from '../services/userServices/listUserService.service';
import { getCurrentUserService } from '../services/userServices/getCurrentUser.service';

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try{           
        const newUser = req.body;
        const createdUser = await createUserService(newUser);
        res.status(201).json(createdUser);    
    }catch(error){
        next(error);
    }
    
}

export const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService();  
    res.status(200).json(users);
}

export const listUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id} = req.params;     
        const user = await listUserService(Number(id));    
        res.status(200).json(user);
    }catch(error){  
        next(error);
    }    
}

export const getCurrentUserController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await getCurrentUserService(Number(req.body.user_id));    
        res.status(200).json(user);
    }catch(error){  
        next(error);
    }    
}






