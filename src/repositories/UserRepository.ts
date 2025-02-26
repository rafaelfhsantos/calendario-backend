import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";

export const UserRepository = AppDataSource.getRepository(User);