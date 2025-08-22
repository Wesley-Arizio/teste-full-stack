import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { AppError } from "../error";
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

    try {
      const result = await this.userService.getUser(id);

      return response.status(200).send(result);
    } catch (e) {
      console.error(e);
      if (e instanceof AppError) {
        return response
          .status(e.status)
          .send({ error: true, message: e.message });
      } else {
        return response
          .status(500)
          .send({ error: true, message: "Internal Server Error" });
      }
    }
  }

  async createUser(request: Request<{}, {}, ICreateUser>, response: Response) {
    try {
      const result = await this.userService.createUser(request.body);
      return response.status(201).send(result);
    } catch (e) {
      console.error(e);
      if (e instanceof AppError) {
        return response
          .status(e.status)
          .send({ error: true, message: e.message });
      } else {
        return response
          .status(500)
          .send({ error: true, message: "Internal Server Error" });
      }
    }
  }

  async deleteUser(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response
        .status(400)
        .send({ error: true, message: "Invalid User Id" });
    }

    try {
      const result = await this.userService.deleteUser(id);

      return response.send(result);
    } catch (e) {
      console.error(e);
      if (e instanceof AppError) {
        return response
          .status(e.status)
          .send({ error: true, message: e.message });
      } else {
        return response
          .status(500)
          .send({ error: true, message: "Internal Server Error" });
      }
    }
  }

  async updateUser(request: Request<{ id: string }, {}, IUpdateUser>, response: Response) {
    try {
      const id = Number(request.params.id);

      if (isNaN(id)) {
        return response
          .status(400)
          .send({ error: true, message: "Invalid User Id" });
      }

      const result = await this.userService.updateUser({ ...request.body, id });
      return response.status(200).send(result);
    } catch (e) {
      console.error(e);
      if (e instanceof AppError) {
        return response
          .status(e.status)
          .send({ error: true, message: e.message });
      } else {
        return response
          .status(500)
          .send({ error: true, message: "Internal Server Error" });
      }
    }
  }
}
