import { Router } from "express";

import { createUserController, getCurrentUserController, listUserController, listUsersController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/tokenValidation.middleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/users", createUserController);
userRouter.get("/users", listUsersController);
userRouter.get("/users/:id", verifyToken, listUserController);
userRouter.get("/me",authMiddleware, verifyToken, getCurrentUserController);



export default userRouter;