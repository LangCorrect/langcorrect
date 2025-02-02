import { CorrectionType, PrismaClient } from "@prisma/client";
import {
    DjangoChallenge,
    DjangoFollower,
    DjangoLanguage,
    DjangoPost,
    DjangoPostRow,
    DjangoPostRowCorrection,
    DjangoPostUserCorrection,
    DjangoPostUserCorrectionReply,
    DjangoPrompt,
    DjangoUser,
    DjangoUserLanguage,
    ModelTypes,
} from "./types";

const BATCH_SIZE = 50000;

const prisma = new PrismaClient();

const modelToFunction: Record<ModelTypes, Function> = {
    language: addLanguages,
    user: addUsers,
    "user-language": addUserLanguages,
    follower: addFollowers,
    challenge: addChallenges,
    prompt: addPrompts,
    post: addPosts,
    "post-row": addPostRows,
    "post-user-correction": addPostUserCorrections,
    "post-row-correction": addPostRowCorrections,
    "post-user-correction-reply": addPostUserCorrectionReplies,
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

async function addPrompts(objs: DjangoPrompt[]) {
    await batchInsert(
        prisma.prompt,
        objs.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            oldSlug: obj.old_slug,
            text: obj.text,
            level: obj.proficiency,
            languageId: obj.language_id,
            challengeId: obj.challenge_id,
            authorId: obj.author_id,
        })),
        "prompts"
    );

    const tagMap = await addTags(objs.flatMap((obj) => obj.tags));

    await batchInsert(
        prisma.promptTag,
        objs.flatMap((obj) =>
            obj.tags.map((tag) => ({
                tagId: tagMap.get(tag.toLowerCase())!,
                promptId: obj.uuid,
            }))
        ),
        "prompt tags"
    );
}

async function addPosts(objs: DjangoPost[]) {
    await batchInsert(
        prisma.post,
        objs.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            authorId: obj.author_id,
            languageId: obj.language_id,
            slug: obj.slug,
            title: obj.title,
            text: obj.text,
            nativeText: obj.native_text,
            genderOfNarration: obj.gender_of_narration,
            visibility: obj.visibility,
            status: obj.status,
            level: obj.proficiency,
            promptId: obj.prompt_id,
            isCorrected: obj.is_corrected,
        })),
        "posts"
    );

    const tagMap = await addTags(objs.flatMap((obj) => obj.tags));

    await batchInsert(
        prisma.postTag,
        objs.flatMap((obj) =>
            obj.tags.map((tag) => ({
                tagId: tagMap.get(tag.toLowerCase())!,
                postId: obj.uuid,
            }))
        ),
        "post tags"
    );
}

async function addPostRows(objs: DjangoPostRow[]) {
    await batchInsert(
        prisma.postRow,
        objs.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            authorId: obj.author_id,
            postId: obj.post_id,
            sentence: obj.sentence,
            isVisible: obj.is_visible,
            order: obj.order,
        })),
        "post rows"
    );
}

async function addPostUserCorrections(objs: DjangoPostUserCorrection[]) {
    await batchInsert(
        prisma.postUserCorrection,
        objs.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            authorId: obj.author_id,
            postId: obj.post_id,
            feedback: obj.feedback,
        })),
        "post user corrections"
    );
}

async function addPostRowCorrections(objs: DjangoPostRowCorrection[]) {
    for (let i = 0; i < objs.length; i += BATCH_SIZE) {
        const batch = objs.slice(i, i + BATCH_SIZE);

        await batchInsert(
            prisma.postRowCorrection,
            batch.map((obj) => ({
                uuid: obj.uuid,
                createdAt: obj.created_at,
                updatedAt: obj.updated_at,
                postRowId: obj.post_row_id,
                postUserCorrectionId: obj.post_user_correction_id,
                text: obj.text,
                note: obj.note,
                type:
                    // @ts-ignore
                    obj.type === "perfect"
                        ? CorrectionType.PERFECT
                        : CorrectionType.CORRECTED,
            })),
            `post row corrections (${i}/${objs.length})`
        );
    }

    const tagMap = await addTags(objs.flatMap((obj) => obj.tags));

    await batchInsert(
        prisma.correctionTag,
        objs.flatMap((obj) =>
            obj.tags.map((tag) => ({
                tagId: tagMap.get(tag.toLowerCase())!,
                postRowCorrectionId: obj.uuid,
            }))
        ),
        "post row correction tags"
    );
}

async function addPostUserCorrectionReplies(
    objs: DjangoPostUserCorrectionReply[]
) {
    const topLevelReplies = objs.filter((obj) => !obj.parent_reply_id);
    const childReplies = objs.filter((obj) => obj.parent_reply_id);

    await batchInsert(
        prisma.postUserCorrectionReply,
        topLevelReplies.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            postUserCorrectionId: obj.post_user_correction_id,
            postRowCorrectionId: obj.post_correction_id,
            text: obj.text,
            authorId: obj.author_id,
        })),
        "top-level replies"
    );

    await batchInsert(
        prisma.postUserCorrectionReply,
        childReplies.map((obj) => ({
            uuid: obj.uuid,
            createdAt: obj.created_at,
            updatedAt: obj.updated_at,
            postUserCorrectionId: obj.post_user_correction_id,
            postRowCorrectionId: obj.post_correction_id,
            text: obj.text,
            authorId: obj.author_id,
            parentReplyId: obj.parent_reply_id,
        })),
        "child replies"
    );
}

async function addTags(tags: string[]) {
    const uniqueTags = Array.from(
        new Set(tags.map((tag) => tag.toLowerCase()))
    );

    const existingTags = await prisma.tag.findMany({
        where: { name: { in: uniqueTags } },
        select: { uuid: true, name: true },
    });

    const existingTagMap = new Map(
        existingTags.map((tag) => [tag.name, tag.uuid])
    );

    const newTags = uniqueTags
        .filter((tag) => !existingTagMap.has(tag))
        .map((tag) => ({ name: tag }));

    if (newTags.length > 0) {
        await prisma.tag.createMany({ data: newTags, skipDuplicates: true });
    }

    const allTags = await prisma.tag.findMany({
        where: { name: { in: uniqueTags } },
        select: { uuid: true, name: true },
    });

    return new Map(allTags.map((tag) => [tag.name, tag.uuid]));
}
