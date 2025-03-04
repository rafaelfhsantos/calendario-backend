import { User } from "../../entities/User";
import { AppError } from "../../errors/appError";
import { AppDataSource } from "../../ormconfig";

export const getCurrentUserService = async (userId:number) => {
    const userRepository = AppDataSource.getRepository(User);    
    
    const user = await userRepository.findOneBy({id: userId});    
    
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return user;
}