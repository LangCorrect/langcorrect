import * as argon2 from "argon2";

export async function verifyPassword(hash: string, raw: string) {
    let cleanedHash = hash;

    // TODO: Clean the db instead
    if (hash.startsWith("argon2$argon2id$")) {
        cleanedHash = hash.slice(6);
    }
    return await argon2.verify(cleanedHash, raw);
}
