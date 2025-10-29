import z from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(3, "Full name must be at least 3 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .refine((s) => !s.includes(" "), "username must contain a space"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "user"], "role harus 'admin' atau 'user'"),
});

export const updateUserSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .optional(),
});
