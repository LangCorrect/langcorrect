import {
    Challenge,
    Language,
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
