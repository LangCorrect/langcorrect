import { Role, User } from "@prisma/client";
import { User as AuthUser } from "next-auth";

function hasRole(role: Role, viewer?: AuthUser | null) {
    return viewer?.role === role;
}

function isOwner(user: User, viewer?: AuthUser | null) {
    return viewer?.username === user.username;
}

function canSeeId(viewer?: AuthUser | null) {
    if (!viewer) return false;

    return hasRole(Role.ADMIN, viewer);
}

function canSeeUsername(viewer?: AuthUser | null) {
    return true;
}

function canSeeRole(viewer?: AuthUser | null) {
    return true;
}

function canSeeBio(viewer?: AuthUser | null) {
    return true;
}

function canSeeGender(viewer?: AuthUser | null) {
    return true;
}

function canSeeDateJoined(viewer?: AuthUser | null) {
    return true;
}

function canSeeStaffNotes(viewer?: AuthUser | null) {
    if (!viewer) return false;

    const allowedRoles: Role[] = [Role.MODERATOR, Role.ADMIN];
    return viewer && allowedRoles.includes(viewer.role as Role);
}

function canSeeLastLogin(viewer?: AuthUser | null) {
    if (!viewer) return false;

    const allowedRoles: Role[] = [Role.MODERATOR, Role.ADMIN];
    return viewer && allowedRoles.includes(viewer.role as Role);
}

function canSeeEmail(user: User, viewer?: AuthUser | null) {
    if (!viewer) return false;

    const allowedRoles: Role[] = [Role.ADMIN];
    return allowedRoles.includes(viewer?.role as Role) || isOwner(user, viewer);
}

function canSeeName(user: User, viewer?: AuthUser | null) {
    if (!viewer) return false;

    const allowedRoles: Role[] = [Role.MODERATOR, Role.ADMIN];
    return allowedRoles.includes(viewer?.role as Role) || isOwner(user, viewer);
}

export {
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
};
