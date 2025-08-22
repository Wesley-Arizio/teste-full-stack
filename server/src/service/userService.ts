import { AppError } from "../error";
import { UserRepository } from "../repository/userRepository";
import { ICreateUser } from "../schema/userSchema";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async listUsers() {
    const users = await this.userRepository.listAll();

    return { users };
  }

  async getUser() {
    console.log("hello word");

    return { ok: true };
  }

  async createUser({ user }: ICreateUser) {
    const exists = await this.userRepository.exists(user.email);

    if (exists) {
      throw new AppError({
        message: "Email already taken",
        status: 409,
      });
    }

    return this.userRepository.createUser({ user });
  }

  async deleteUser() {
    console.log("hello word");

    return { ok: true };
  }

  async updateUser() {
    console.log("hello word");

    return { ok: true };
  }
}
