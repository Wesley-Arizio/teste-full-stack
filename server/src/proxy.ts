import { AppError } from "./error";
import { Response } from "express";

export const proxyController = <T extends object>(controller: T): T => {
  return new Proxy(controller, {
    get(target, prop, receiver) {
      const orig = Reflect.get(target, prop, receiver);
      if (typeof orig === "function") {
        return async (...args: any[]) => {
          try {
            return await orig.apply(target, args);
          } catch (e) {
            const res = args[1] as Response;
            console.error(e);
            if (e instanceof AppError) {
              return res
                .status(e.status)
                .send({ error: true, message: e.message });
            } else {
              return res
                .status(500)
                .send({ error: true, message: "Internal Server Error" });
            }
          }
        };
      }
      return orig;
    },
  });
};
