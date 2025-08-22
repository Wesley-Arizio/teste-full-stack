import { AppError } from "../error";
import { UserRepository } from "../repository/userRepository";
import { ICreateUser, IUpdateUser } from "../schema/userSchema";

export type IUpdateUserWithId = IUpdateUser & { id: number };

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async listUsers() {
    const users = await this.userRepository.listAll();

    return { users };
  }

  async getUser(id: number) {
    const user = await this.userRepository.getUser(id);

    if (!user) {
      throw new AppError({
        message: "User Not Found",
        status: 404,
      });
    }

    return { user };
  }

  async createUser({ user }: ICreateUser) {
    const exists = await this.userRepository.exists({ email: user.email });

    if (exists) {
      throw new AppError({
        message: "Email already taken",
        status: 409,
      });
    }

    return this.userRepository.createUser({ user });
  }

  async deleteUser(id: number) {
    const exists = await this.userRepository.exists({ id });

    if (!exists) {
      throw new AppError({
        message: "User Not Found",
        status: 404,
      });
    }

    const deleted = await this.userRepository.deleteUser(id);
    return { deleted };
  }

  async updateUser({ user, id }: IUpdateUserWithId) {
    const exists = await this.userRepository.exists({ id });

    if (!exists) {
      throw new AppError({
        message: "User Not Found",
        status: 404,
      });
    }

    const updated = await this.userRepository.updateUser({ user, id });
    return { updated };
  }
}
