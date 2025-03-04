import { AppDataSource } from "../../ormconfig";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/user";
import { AppError } from "../../errors/appError";
import { hash } from "bcryptjs";

export const createUserService = async (user: IUser): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    const userExists = users.find((u) => u.email === user.email);
    if (userExists) {
        throw new AppError('User already exists', 400);
    }  
    
    const hashedPassword = await hash(user.password, 10);

    user.password = hashedPassword;

    const newUser = userRepository.create(user);

    await userRepository.save(newUser);
    return newUser;
}

export default createUserService;