import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";

const sessionRouter = Router();

sessionRouter.post("/session", createSessionController);

export default sessionRouter;
