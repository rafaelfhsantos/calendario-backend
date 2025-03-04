import { Router } from "express";

import { cancelInviteController, createEventoController,deleteEventoController,denyInviteController,inviteEventoController,listEventosController,listMyEventosController,listMyInvitationsController,listOneEventoController, updateEventoController } from "../controllers/evento.controller";
import { verifyToken } from "../middlewares/tokenValidation.middleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const eventoRouter = Router();

eventoRouter.post("/evento",authMiddleware, verifyToken ,createEventoController);
eventoRouter.get("/eventos", listEventosController);
eventoRouter.get("/evento/:id", listOneEventoController);
eventoRouter.get("/eventos/meus", authMiddleware, verifyToken, listMyEventosController);
eventoRouter.get("/eventos/convites", authMiddleware, verifyToken, listMyInvitationsController);
eventoRouter.delete("/evento/:id", authMiddleware, verifyToken, deleteEventoController);
eventoRouter.put("/evento/:id", authMiddleware, verifyToken, updateEventoController);
eventoRouter.patch("/invite/:user_email/:evento_id", authMiddleware, verifyToken, inviteEventoController);
eventoRouter.patch("/invitedeny/:evento_id", authMiddleware, verifyToken, denyInviteController);
eventoRouter.patch("/cancelinvite/:evento_id/:guest_id", authMiddleware, verifyToken, cancelInviteController);



export default eventoRouter;