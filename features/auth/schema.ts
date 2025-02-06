import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email")
        .trim(),
    password: z
        .string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(40, "Password must not be over 40 characters long")
        .trim(),
});
