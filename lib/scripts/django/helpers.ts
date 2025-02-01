import { PrismaClient } from "@prisma/client";
import {
    DjangoChallenge,
    DjangoFollower,
    DjangoLanguage,
    DjangoUser,
    DjangoUserLanguage,
    ModelTypes,
} from "./types";

const prisma = new PrismaClient();

const modelToFunction: Record<ModelTypes, Function> = {
    language: addLanguages,
    user: addUsers,
    "user-language": addUserLanguages,
    follower: addFollowers,
    challenge: addChallenges,
    prompt: () => {
        throw new Error("Prompt migration not implemented yet.");
    },
    post: () => {
        throw new Error("Post migration not implemented yet.");
    },
    "post-row": () => {
        throw new Error("Post row migration not implemented yet.");
    },
    "post-user-correction": () => {
        throw new Error("Post user correction migration not implemented yet.");
    },
    "post-row-correction": () => {
        throw new Error("Post row correction migration not implemented yet.");
    },
    "post-user-correction-reply": () => {
        throw new Error(
            "Post user correction reply migration not implemented yet."
        );
    },
};

export async function migrateData<T>(data: T[], model: ModelTypes) {
    if (modelToFunction[model]) {
        await modelToFunction[model](data);
        console.info(`Finished migrating ${model}`);
    } else {
        console.error(`No migration function found for model: ${model}`);
    }
}

async function batchInsert<T>(table: any, data: T[], logName: string) {
    if (data.length > 0) {
        const results = await table.createMany({ data, skipDuplicates: true });
        console.info(`Added ${results.count} ${logName}`);
    } else {
        console.info(`No ${logName} to add.`);
    }
}

async function addLanguages(objs: DjangoLanguage[]) {
    await batchInsert(
        prisma.language,
        objs.map((obj) => ({
            uuid: obj.uuid,
            name: obj.name,
            code: obj.code,
            familyCode: obj.family_code,
        })),
        "languages"
    );
}

async function addUsers(objs: DjangoUser[]) {
    await batchInsert(
        prisma.user,
        objs.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            lastLogin: obj.last_login,
            password: obj.password,
            username: obj.username,
            firstName: obj.first_name,
            lastName: obj.last_name,
            email: obj.email,
            gender: obj.gender,
            bio: obj.bio,
            staffNote: obj.staff_notes,
            role: obj.role,
        })),
        "users"
    );
}

async function addUserLanguages(objs: DjangoUserLanguage[]) {
    await batchInsert(
        prisma.userLanguage,
        objs.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            userId: obj.userId,
            languageId: obj.languageId,
            level: obj.level,
        })),
        "user languages"
    );
}

async function addFollowers(objs: DjangoFollower[]) {
    await batchInsert(
        prisma.userFollow,
        objs.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            followerId: obj.follower_id,
            followingId: obj.following_id,
        })),
        "followers"
    );
}

async function addChallenges(objs: DjangoChallenge[]) {
    await batchInsert(
        prisma.challenge,
        objs.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            title: obj.title,
            description: obj.description,
            url: obj.url,
            startDate: obj.start_date,
            endDate: obj.end_date,
            oldSlug: obj.old_slug,
            status: obj.status,
        })),
        "challenges"
    );
}
