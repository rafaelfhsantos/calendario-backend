import { AppDataSource } from "../../ormconfig";
import { IUserLogin } from "../../interfaces/user";
import { User } from "../../entities/User";
import "dotenv/config";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";


export const createSessionService = async ({ email, password }: IUserLogin) => {
  
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: email,
    },
    select: ["id", "password"],
  });

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

 
    const passwordCheck = await compare(password, user.password);

    if (!passwordCheck) {
      throw new AppError("Invalid email or password", 403);
    }
  

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return token;

};

