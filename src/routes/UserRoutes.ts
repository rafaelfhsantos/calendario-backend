import { Router } from "express";

import { createUserController, listUserController, listUsersController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/tokenValidation.middleware";

const userRouter = Router();

userRouter.post("/users", createUserController);
userRouter.get("/users", listUsersController);
userRouter.get("/users/:id", verifyToken, listUserController);

export default userRouter;