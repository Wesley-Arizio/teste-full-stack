import { Router } from "express";
import { createUserController } from "./factory/userFactory";
import { validate } from "./middleware/validate";
import { createUserSchema } from "./schema/userSchema";

const routes = Router();
const userController = createUserController();

routes.get("/user/list", userController.listUsers.bind(userController));
routes.get("/user/:id", userController.getUser.bind(userController));
routes.post("/user/create", validate(createUserSchema), userController.createUser.bind(userController));
routes.delete("/user/delete/:id", userController.deleteUser.bind(userController));
routes.put("/user/:id/edit", userController.updateUser.bind(userController));

export { routes }
