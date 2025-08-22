import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { AppError } from "../error";
import { ICreateUser } from "../schema/userSchema";

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

  async createUser(request: Request<{}, {}, ICreateUser>, response: Response) {
    try {
      const result = await this.userService.createUser(request.body);
      return response.send(result);
    } catch (e) {
      console.error(e);
      if (e instanceof AppError) {
        return response.status(e.status).send({ error: true, message: e.message })
      } else {
        return response.status(500).send({ error: true, message: "Internal Server Error" })
      }
    }
  }

  async deleteUser(request: Request, response: Response) {
    const result = await this.userService.deleteUser();

    return response.send(result);
  }

  async updateUser(request: Request, response: Response) {
    const result = await this.userService.updateUser();

    return response.send(result);
  }
}
