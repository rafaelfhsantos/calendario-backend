import {Request, Response} from 'express';
import {createUserService} from '../services/userServices/createUser.service';
import { listUserService, listUsersService } from '../services/userServices/listUserService.service';

export const createUserController = async (req: Request, res: Response) => {
    console.log("📩 Dados recebidos no registro:", req.body);    
    const newUser = req.body;
        const createdUser = await createUserService(newUser);
        res.status(201).json(createdUser);    
}

export const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService();  
    res.status(200).json(users);
}

export const listUserController = async (req: Request, res: Response) => {
    const { id} = req.params;
    console.log("🔍 Buscando usuário com id:", id);    
    const user = await listUserService(Number(id));    
    res.status(200).json(user);
}


// export const listOneUserController = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const user = await listOneUserService(id);
  
//     return res.status(200).json(user);
//   };



