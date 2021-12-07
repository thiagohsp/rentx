import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("shoud be able to authenticate user with email and password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "johndoe@mail.com",
      password: "secretpassword",
      name: "John Doe",
    };

    await createUserUseCase.execute(user);

    const authentication = await authenticateUserUseCase.execute({
      email: "johndoe@mail.com",
      password: "secretpassword",
    });

    expect(authentication).toHaveProperty("token");
  });

  it("should not be able to authenticate an non-existent user", () => {
    expect(async () => {
      authenticateUserUseCase.execute({
        email: "nonexistentuser@mail.com",
        password: "secretpassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "johndoe@mail.com",
        password: "secretpassword",
        name: "John Doe",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "johndoe@mail.com",
        password: "wrong-secretpassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
