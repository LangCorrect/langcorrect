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
} from "@/features/users/permissions";
import { Gender, Role } from "@prisma/client";
import "@testing-library/jest-dom";
import { randomUUID } from "crypto";

function createMockDBUser({
    username,
    role,
}: {
    username: string;
    role: Role;
}) {
    const date = new Date();
    return {
        uuid: randomUUID(),
        createdAt: date,
        updatedAt: date,
        lastLogin: date,
        password: "password",
        username,
        email: `${username}@example.com`,
        firstName: null,
        lastName: null,
        gender: Gender.UNKNOWN,
        bio: null,
        staffNote: null,
        role,
    };
}

const ADMIN_USER = createMockDBUser({
    username: "admin",
    role: Role.ADMIN,
});
const MOD_USER = createMockDBUser({
    username: "moderator",
    role: Role.MODERATOR,
});
const USER = createMockDBUser({ username: "user", role: Role.USER });
const ANON_USER = null;

const USERS = [ANON_USER, ADMIN_USER, MOD_USER, USER];

test("everyone can see public data", () => {
    for (const user of USERS) {
        expect(canSeeUsername(user)).toBe(true);
        expect(canSeeRole(user)).toBe(true);
        expect(canSeeGender(user)).toBe(true);
        expect(canSeeBio(user)).toBe(true);
        expect(canSeeDateJoined(user)).toBe(true);
    }
});

test("anon can't see private data", () => {
    expect(canSeeId(null)).toBe(false);
    expect(canSeeStaffNotes(null)).toBe(false);
    expect(canSeeLastLogin(null)).toBe(false);
    expect(canSeeEmail(USER, null)).toBe(false);
    expect(canSeeName(USER, null)).toBe(false);
});

test("users can't see private data of other users", () => {
    expect(canSeeId(USER)).toBe(false);
    expect(canSeeStaffNotes(USER)).toBe(false);
    expect(canSeeLastLogin(USER)).toBe(false);
    expect(canSeeEmail(MOD_USER, USER)).toBe(false);
    expect(canSeeName(MOD_USER, USER)).toBe(false);
});

test("mods can see name, staff notes and last login", () => {
    expect(canSeeName(USER, MOD_USER)).toBe(true);
    expect(canSeeStaffNotes(MOD_USER)).toBe(true);
    expect(canSeeLastLogin(MOD_USER)).toBe(true);
});

test("mods can't see email or id", () => {
    expect(canSeeId(MOD_USER)).toBe(false);
    expect(canSeeEmail(USER, MOD_USER)).toBe(false);
});

test("admins can see private data", () => {
    expect(canSeeId(ADMIN_USER)).toBe(true);
    expect(canSeeStaffNotes(ADMIN_USER)).toBe(true);
    expect(canSeeLastLogin(ADMIN_USER)).toBe(true);
    expect(canSeeEmail(USER, ADMIN_USER)).toBe(true);
    expect(canSeeName(USER, ADMIN_USER)).toBe(true);
});

test("owners can see their own data", () => {
    expect(canSeeEmail(USER, USER)).toBe(true);
    expect(canSeeName(USER, USER)).toBe(true);
});

test("null and undefined viewers have the same access restrictions", () => {
    expect(canSeeId(undefined)).toBe(false);
    expect(canSeeStaffNotes(undefined)).toBe(false);
    expect(canSeeLastLogin(undefined)).toBe(false);
    expect(canSeeEmail(USER, undefined)).toBe(false);
    expect(canSeeName(USER, undefined)).toBe(false);
});
