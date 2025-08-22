import { UserController } from "../controller/userController";
import { UserRepository } from "../repository/userRepository";
import { UserService } from "../service/userService";

export function createUserController() {
    const repository = new UserRepository();
    const service = new UserService(repository);
    return new UserController(service)
}