import { Request, Response } from "express";
import { UserService } from "../service/userService";

export class UserController {
  constructor(private userService: UserService) {}

  async listUsers(request: Request, response: Response) {
    const result = await this.userService.listUsers();

    return response.send(result);
  }

  async getUser(request: Request, response: Response) {
    const result = await this.userService.getUser();

    return response.send(result);
  }

  async createUser(request: Request, response: Response) {
    const result = await this.userService.createUser();

    return response.send(result);
  }

  async deleteUser(request: Request, response: Response) {
    const result = await this.userService.createUser();

    return response.send(result);
  }

  async updateUser(request: Request, response: Response) {
    const result = await this.userService.updateUser();

    return response.send(result);
  }
}
