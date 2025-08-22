import { z } from "zod";

export const createUserSchema = z.object({
  user: z.object({
    name: z.string().nonempty("Name cannot be empty").optional(),
    email: z.email(),
    birthdate: z
      .string()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid birthdate format, expected ISO 8601",
      }),
    address: z.string().nonempty("Address cannot be empty").optional(),
  })
});

export const updateUserSchema = z.object({
  user: z.object({
    name: z.string().nonempty("Name cannot be empty").optional(),
    address: z.string().nonempty("Address cannot be empty").optional(),
  }),
});

export type ICreateUser = z.infer<typeof createUserSchema>;
export type IUpdateUser = z.infer<typeof updateUserSchema>;