import { LoginFormSchema } from "@/features/auth/schema";
import { getUser } from "@/features/users/data";
import { Role } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserNotFoundError } from "./lib/errors";
import { verifyPassword } from "./lib/password-utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (rawCredentials) => {
                const validatedFields =
                    LoginFormSchema.safeParse(rawCredentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUser(email);
                    if (!user) throw new UserNotFoundError();

                    const isCorrectPassword = await verifyPassword(
                        user.password,
                        password
                    );

                    if (isCorrectPassword) {
                        return {
                            id: user.uuid,
                            username: user.username,
                            role: user.role,
                        };
                    }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.role = token.role as Role;
            }

            return session;
        },
    },
});
