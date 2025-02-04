import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: true, // TODO: remove
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log("🚀 ~ authorize: ~ credentials:", credentials);
                let user = null;

                const isCorrectPassword = true;
                if (isCorrectPassword) {
                    user = {
                        id: "1",
                        name: "John Doe",
                        email: "example@example.com",
                        image: "https://picsum.photos/200",
                    };
                }

                return user;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            console.log("/===== Inside of jwt callback =====/");
            console.log("🚀 ~ user:", user);
            console.log("🚀 ~ token:", token);

            return token;
        },
        session: ({ session, token }) => {
            console.log("/===== Inside of session callback =====/");
            console.log("🚀 ~ session:", session);
            console.log("🚀 ~ token:", token);

            return session;
        },
    },
});
