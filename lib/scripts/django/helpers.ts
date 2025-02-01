import { PrismaClient } from "@prisma/client";
import { DjangoLanguage, ModelTypes } from "./types";

const prisma = new PrismaClient();

const modelToFunction: Record<ModelTypes, Function> = {
    language: addLanguages,
    user: () => {
        throw new Error("User migration not implemented yet.");
    },
    "user-language": () => {
        throw new Error("User language migration not implemented yet.");
    },
    follower: () => {
        throw new Error("Follower migration not implemented yet.");
    },
    challenge: () => {
        throw new Error("Challenge migration not implemented yet.");
    },
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
