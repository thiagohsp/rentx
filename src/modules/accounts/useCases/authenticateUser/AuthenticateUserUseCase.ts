import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUserRepository";

interface IAuthRequest {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({}, "4b72259da0c02134cdbcda9a8a3554ba44384ea2", {
      expiresIn: "1d",
      subject: user.id,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
export { AuthenticateUserUseCase };
