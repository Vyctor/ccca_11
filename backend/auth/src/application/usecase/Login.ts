import UserRepository from "../repository/UserRepository";
import TokenGenerator from "../../domain/entity/TokenGenerator";

export default class Login {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.get(input.email);
    if (!user) throw new Error("Authentication Failed!");
    if (!user.validatePassword(input.password))
      throw new Error("Authentication Failed!");
    const tokenGenerator = new TokenGenerator();
    return { token: tokenGenerator.sign(user, input.date) };
  }
}

type Input = {
  email: string;
  password: string;
  date: Date;
};

type Output = {
  token: string;
};
