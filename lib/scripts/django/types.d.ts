import { Language } from "@prisma/client";

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
