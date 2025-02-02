import {
    Challenge,
    Language,
    Prompt,
    User,
    UserFollow,
    UserLanguage,
} from "@prisma/client";

export type ModelTypes =
    | "language"
    | "user"
    | "user-language"
    | "follower"
    | "challenge"
    | "prompt"
    | "post"
    | "post-row"
    | "post-user-correction"
    | "post-row-correction"
    | "post-user-correction-reply";

export type DjangoLanguage = {
    uuid: Language["uuid"];
    name: Language["name"];
    code: Language["code"];
    family_code: Language["familyCode"];
};

export type DjangoUser = {
    uuid: User["uuid"];
    created_at: User["createdAt"];
    updated_at: User["updatedAt"];
    last_login: User["lastLogin"];
    password: User["password"];
    username: User["username"];
    first_name: User["firstName"];
    last_name: User["lastName"];
    email: User["email"];
    gender: User["gender"];
    bio: User["bio"];
    staff_notes?: User["staffNote"];
    role: User["role"];
};

export type DjangoUserLanguage = {
    uuid: UserLanguage["uuid"];
    created_at: UserLanguage["createdAt"];
    updated_at: UserLanguage["updatedAt"];
    userId: UserLanguage["userId"];
    languageId: UserLanguage["languageId"];
    level: UserLanguage["level"];
};

export type DjangoFollower = {
    uuid: UserFollow["uuid"];
    created_at: UserFollow["createdAt"];
    updated_at: UserFollow["updatedAt"];
    follower_id: User["uuid"];
    following_id: User["uuid"];
};

export type DjangoChallenge = {
    uuid: Challenge["uuid"];
    created_at: Challenge["createdAt"];
    updated_at: Challenge["updatedAt"];
    title: Challenge["title"];
    description: Challenge["description"];
    url: Challenge["url"];
    start_date: Challenge["startDate"];
    end_date: Challenge["endDate"];
    old_slug: Challenge["oldSlug"];
    status: Challenge["status"];
};

export type DjangoPrompt = {
    uuid: Prompt["uuid"];
    created_at: Prompt["createdAt"];
    updated_at: Prompt["updatedAt"];
    text: Prompt["text"];
    proficiency: Prompt["level"];
    challenge_id: Challenge["uuid"];
    author_id: User["uuid"];
    tags: string[];
    old_slug: Prompt["oldSlug"];
    language_id: Language["uuid"];
};

export type DjangoPost = {
    uuid: Post["uuid"];
    created_at: Post["createdAt"];
    updated_at: Post["updatedAt"];
    author_id: User["uuid"];
    language_id: Language["uuid"];
    slug: Post["slug"];
    title: Post["title"];
    text: Post["text"];
    native_text: Post["nativeText"];
    gender_of_narration: Post["genderOfNarration"];
    visibility: Post["visibility"];
    status: Post["status"];
    proficiency: Post["proficiency"];
    prompt_id: Prompt["uuid"];
    tags: string[];
    is_corrected: Post["isCorrected"];
};
