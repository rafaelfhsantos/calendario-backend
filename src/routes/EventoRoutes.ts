import { Router } from "express";

import { createEventoController,listEventosController,listOneEventoController } from "../controllers/evento.controller";
import { verifyToken } from "../middlewares/tokenValidation.middleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const eventoRouter = Router();

eventoRouter.post("/evento",authMiddleware, verifyToken ,createEventoController);
eventoRouter.get("/eventos", listEventosController);
eventoRouter.get("/evento/:id", listOneEventoController);

export default eventoRouter;