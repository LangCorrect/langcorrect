import {
    Challenge,
    Language,
    Post,
    PostRow,
    PostRowCorrection,
    PostUserCorrection,
    PostUserCorrectionReply,
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

export type DjangoPostRow = {
    uuid: PostRow["uuid"];
    created_at: PostRow["createdAt"];
    updated_at: PostRow["updatedAt"];
    author_id: User["uuid"];
    post_id: Post["uuid"];
    sentence: PostRow["sentence"];
    is_visible: PostRow["isVisible"];
    order: PostRow["order"];
};

export type DjangoPostUserCorrection = {
    uuid: PostUserCorrection["uuid"];
    created_at: PostUserCorrection["createdAt"];
    updated_at: PostUserCorrection["updatedAt"];
    author_id: User["uuid"];
    post_id: Post["uuid"];
    feedback: PostUserCorrection["feedback"];
};

export type DjangoPostRowCorrection = {
    uuid: PostRowCorrection["uuid"];
    created_at: PostRowCorrection["createdAt"];
    updated_at: PostRowCorrection["updatedAt"];
    post_row_id: PostRow["uuid"];
    post_user_correction_id: PostUserCorrection["uuid"];
    text: PostRowCorrection["text"];
    note: PostRowCorrection["note"];
    type: PostRowCorrection["type"];
    tags: string[];
};

export type DjangoPostUserCorrectionReply = {
    uuid: PostUserCorrectionReply["uuid"];
    created_at: PostUserCorrectionReply["createdAt"];
    updated_at: PostUserCorrectionReply["updatedAt"];
    post_user_correction_id: PostUserCorrection["uuid"];
    post_correction_id: PostRowCorrection["uuid"];
    text: PostUserCorrectionReply["text"];
    parent_reply_id: PostUserCorrectionReply["parentReplyId"];
    author_id: User["uuid"];
};
