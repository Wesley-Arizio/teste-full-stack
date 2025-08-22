import { UserController } from "../controller/userController";
import { proxyController } from "../proxy";
import { UserRepository } from "../repository/userRepository";
import { UserService } from "../service/userService";

export function createUserController() {
  const repository = new UserRepository();
  const service = new UserService(repository);
  return proxyController(new UserController(service));
}
