import type { User as PrismaUser, Role } from "@prisma/client";
import "next-auth";

/**
 * Overrides the default `User` type provided by NextAuth.
 * Signing in/up through OAuth providers is not currently planned.
 * @see: {@link https://authjs.dev/getting-started/typescript?framework=next-js}
 */
declare module "next-auth" {
    interface Account {}

    interface User {
        id: PrismaUser["uuid"];
        username: PrismaUser["username"];
        role: Role;
    }

    interface Session {
        user: User;
    }
}

export type LoginFormState =
    | {
          errors?: {
              email?: string[];
              password?: string[];
          };
          message?: string;
      }
    | undefined;
