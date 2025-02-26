import { Request, Response, NextFunction } from "express";

import {createSessionService} from "../services/sessionServices/createSession.service";

export const createSessionController = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { email, password } = req.body;
  const token = await createSessionService({ email, password });

  res.status(201).json({ token: token });
  }catch(error){
    next(error);
  }
  
};
