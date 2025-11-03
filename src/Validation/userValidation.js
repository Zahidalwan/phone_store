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
  fullname: z.string().min(3).optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .refine((s) => !s.includes(" "), "username must contain a space"),
  email: z.email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  role: z
    .enum(["admin", "user"], { message: "role harus 'admin' atau 'user'" })
    .optional(),
  address: z.string().min(5, "address minimal 5 karakter").optional(),
  phone_number: z
    .string()
    .regex(/^(\+62|0)\d{9,13}$/, "Invalid phone number")
    .optional(),
  age: z
    .number({ invalid_type_error: "age must be number" })
    .min(10, "age minimum 10 years old")
    .max(100, "age maximum 100 years old")
    .optional(),
});
