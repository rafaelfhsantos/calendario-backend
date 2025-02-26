import { AppDataSource } from "../../ormconfig";
import { User } from "../../entities/User";
import { AppError } from "../../errors/appError";

export const listUsersService = async () => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return users;
}

export const listUserService = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id : id});
    if (!user) {
        throw new AppError("User not found", 404);
      }
    return user;
}