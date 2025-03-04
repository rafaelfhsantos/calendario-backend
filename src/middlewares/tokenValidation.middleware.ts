import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: number;
    email: string;
}

// Middleware para verificar token JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Pega o token do header "Authorization"    
    if (!token) {
        res.status(401).json({ message: "Token não fornecido" });
        return
    }

    try {
        const decoded = jwt.verify(token, "your_secret_key") as DecodedToken;
        req.body.id = decoded.id; // Adiciona os dados do usuário na requisição
        req.body.email = decoded.email;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido" });
    }
};
