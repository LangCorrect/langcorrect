import { getCurrentUser } from "@/features/auth/data";
import { db } from "@/lib/db";
import "server-only";
import {
    canSeeBio,
    canSeeDateJoined,
    canSeeEmail,
    canSeeGender,
    canSeeId,
    canSeeLastLogin,
    canSeeName,
    canSeeRole,
    canSeeStaffNotes,
    canSeeUsername,
} from "./permissions";

/**
 * When fetching `User` data for display, use `getUserDTO` instead.
 */
async function getUser(email: string) {
    const user = await db.user.findUnique({
        where: {
            email,
        },
    });
    return user ?? undefined;
}

async function getUserDTO(username: string) {
    const user = await db.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) return null;

    const currentUser = await getCurrentUser();

    return {
        id: canSeeId(currentUser) ? user.uuid : null,
        username: canSeeUsername(currentUser) ? user.username : null,
        email: canSeeEmail(user, currentUser) ? user.email : null,
        role: canSeeRole(currentUser) ? user.role : null,
        gender: canSeeGender(currentUser) ? user.gender : null,
        bio: canSeeBio(currentUser) ? user.bio : null,
        firstName: canSeeName(user, currentUser) ? user.firstName : null,
        lastName: canSeeName(user, currentUser) ? user.lastName : null,
        dateJoined: canSeeDateJoined(currentUser) ? user.createdAt : null,
        lastLogin: canSeeLastLogin(currentUser) ? user.lastLogin : null,
        staffNote: canSeeStaffNotes(currentUser) ? user.staffNote : null,
    };
}

export { getUser };
