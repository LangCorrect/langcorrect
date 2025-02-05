"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { LoginFormState } from "@/types/auth";
import { LoginFormSchema } from "@/lib/schemas/auth";

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
