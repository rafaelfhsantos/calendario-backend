import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

interface DecodedTokenAuth {
  id: number; 
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não fornecido", 401);
  }

  const token = authHeader.split(" ")[1]; // Remove "Bearer " do token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedTokenAuth;

    req.body.user_id = decoded.id; // Adiciona o user_id ao corpo da requisição

    next();
  } catch (error) {
    throw new AppError("Token inválido ou expirado", 401);
  }
};
