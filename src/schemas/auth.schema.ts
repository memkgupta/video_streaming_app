import {z} from "zod"
export const loginSchema = z.object({
      email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
})
export type LoginSchema = z.infer<typeof loginSchema>;
export const registerSchema = z
  .object({
   username: z
      .string()
      .min(1, "Username is required")
      .max(50, "Username too long"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  export type RegisterSchema = z.infer<typeof registerSchema>;