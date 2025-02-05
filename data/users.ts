import { auth } from "@/auth";
import { Role, User } from "@prisma/client";
import { db } from "@/lib/db";
import "server-only";

type Viewer = Pick<User, "username" | "role"> | undefined;

function canSeeUsername(viewer?: Viewer) {
    return true;
}

function canSeeRole(viewer?: Viewer) {
    return true;
}

function canSeeBio(viewer?: Viewer) {
    return true;
}

function canSeeGender(viewer?: Viewer) {
    return true;
}

function canSeeDateJoined(viewer?: Viewer) {
    return true;
}

function hasRole(viewer: Viewer, role: Role) {
    return viewer?.role === role;
}

function isSameUser(user: User, viewer?: Viewer) {
    return viewer?.username === user.username;
}

function canSeeStaffNotes(viewer?: Viewer) {
    return hasRole(viewer, Role.MODERATOR);
}

function canSeeLastLogin(viewer?: Viewer) {
    return viewer?.role === Role.MODERATOR;
}

function canSeeId(viewer?: Viewer) {
    return hasRole(viewer, Role.ADMIN);
}

function canSeeEmail(user: User, viewer?: Viewer) {
    return hasRole(viewer, Role.ADMIN) || isSameUser(user, viewer);
}

function canSeeName(user: User, viewer?: Viewer) {
    return hasRole(viewer, Role.MODERATOR) || isSameUser(user, viewer);
}

async function getUserDTO(username: string) {
    const user = await db.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) return null;

    const currentUser = await getCurrentUser();

    const viewer: Viewer = currentUser
        ? {
              username: currentUser?.username,
              role: currentUser?.role,
          }
        : undefined;

    return {
        id: canSeeId(viewer) ? user.uuid : null,
        username: canSeeUsername(viewer) ? user.username : null,
        email: canSeeEmail(user, viewer) ? user.email : null,
        role: canSeeRole(viewer) ? user.role : null,
        firstName: canSeeName(user, viewer) ? user.firstName : null,
        lastName: canSeeName(user, viewer) ? user.lastName : null,
        bio: canSeeBio(viewer) ? user.bio : null,
        createdAt: canSeeDateJoined(viewer) ? user.createdAt : null,
        lastLogin: canSeeLastLogin(viewer) ? user.lastLogin : null,
        staffNote: canSeeStaffNotes(viewer) ? user.staffNote : null,
        gender: canSeeGender(viewer) ? user.gender : null,
    };
}

/**
 * This should only be used during the authorization process.
 *
 * Use `getUserDTO` to get a user's data for display.
 */
async function getUserByEmail(email: string): Promise<User | undefined> {
    const user = await db.user.findUnique({
        where: {
            email,
        },
    });
    return user ?? undefined;
}

async function getCurrentUser() {
    const session = await auth();
    if (!session || !session.user) return null;

    return {
        id: session.user?.id,
        username: session.user?.username,
        email: session.user?.email,
        role: session.user?.role,
    };
}

export { getCurrentUser, getUserByEmail, getUserDTO };
