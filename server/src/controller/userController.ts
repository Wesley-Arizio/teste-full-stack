import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { ICreateUser, IUpdateUser } from "../schema/userSchema";

export class UserController {
  constructor(private userService: UserService) {}

  async listUsers(request: Request, response: Response) {
    const result = await this.userService.listUsers();

    return response.send(result);
  }

  async getUser(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response
        .status(400)
        .send({ error: true, message: "Invalid User Id" });
    }

    const result = await this.userService.getUser(id);

    return response.status(200).send(result);
  }

  async createUser(request: Request<{}, {}, ICreateUser>, response: Response) {
    const result = await this.userService.createUser(request.body);
    return response.status(201).send(result);
  }

  async deleteUser(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response
        .status(400)
        .send({ error: true, message: "Invalid User Id" });
    }
    const result = await this.userService.deleteUser(id);

    return response.send(result);
  }

  async updateUser(
    request: Request<{ id: string }, {}, IUpdateUser>,
    response: Response
  ) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response
        .status(400)
        .send({ error: true, message: "Invalid User Id" });
    }

    const result = await this.userService.updateUser({ ...request.body, id });
    return response.status(200).send(result);
  }
}
