import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./ormconfig";
import userRouter from "./routes/UserRoutes";
import sessionRouter from "./routes/session.routes";
import eventoRouter from "./routes/EventoRoutes";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";

process.on("uncaughtException", (error) => {
    console.error("Erro não tratado:", error);
});
  
process.on("unhandledRejection", (reason, promise) => {
    console.error("Rejeição não tratada em Promise:", promise, "Motivo:", reason);
});

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(sessionRouter);
app.use(eventoRouter);

// Error-handling middleware should be added after all other middleware and routes
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     return handleAppErrorMiddleware(error, req, res, next);
// });
// app.use(handleAppErrorMiddleware as any);
app.use(handleAppErrorMiddleware);


console.log(typeof handleAppErrorMiddleware);

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Banco de dados conectado com sucesso!");
        app.listen(5000, () => console.log("🚀 Servidor rodando na porta 5000"));
    })
    .catch((error) => console.log(error));

