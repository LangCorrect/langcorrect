import { auth } from "@/auth";
import { User as AuthUser } from "next-auth";
import "server-only";

async function getCurrentUser(): Promise<AuthUser | null> {
    const session = await auth();
    if (!session || !session.user) return null;

    return {
        id: session.user?.id,
        username: session.user?.username,
        role: session.user?.role,
    };
}

export { getCurrentUser };
