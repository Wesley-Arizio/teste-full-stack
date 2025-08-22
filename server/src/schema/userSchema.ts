import { z } from "zod";

export const createUserSchema = z.object({
  user: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email(),
    birthdate: z
      .string()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid birthdate format, expected ISO 8601",
      }),
    address: z
      .string()
      .optional()
  })
});

export type ICreateUser = z.infer<typeof createUserSchema>;