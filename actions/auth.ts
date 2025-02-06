"use server";

import { signIn, signOut } from "@/auth";
import { LoginFormSchema } from "@/features/auth/schema";
import { LoginFormState } from "@/features/auth/types";
import { AuthError } from "next-auth";

export async function login(state: LoginFormState, rawFormData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: rawFormData.get("email"),
        password: rawFormData.get("password"),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Invalid credentials. Please try again.",
                    };

                default:
                    return {
                        message:
                            "Whoops! Something went wrong. Please try again.",
                    };
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut();
}
