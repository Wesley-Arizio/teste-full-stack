import { Router } from "express";
import { createUserController } from "./factory/userFactory";
import { validate } from "./middleware/validate";
import { createUserSchema } from "./schema/userSchema";

const routes = Router();
const userController = createUserController();

routes.get("/user/list", userController.listUsers);
routes.get("/user/:id", userController.getUser);
routes.post("/user/create", validate(createUserSchema), userController.createUser);
routes.delete("/user/delete/:id", userController.deleteUser);
routes.put("/user/:id/edit", userController.updateUser);

export { routes }
