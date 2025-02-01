import * as fs from "fs";
import { migrateData } from "./helpers";
import { ModelTypes } from "./types";

const DATA_PATHS: { model: ModelTypes; path: string }[] = [
    { model: "language", path: "sensative/data/languages.json" },
    { model: "user", path: "sensative/data/users.json" },
    { model: "user-language", path: "sensative/data/user-languages.json" },
    { model: "follower", path: "sensative/data/followers.json" },
    { model: "challenge", path: "sensative/data/challenges.json" },
    { model: "prompt", path: "sensative/data/prompts.json" },
];

async function migrate() {
    for (const { model, path } of DATA_PATHS) {
        try {
            const data = await fs.promises.readFile(path, "utf-8");
            const objs = JSON.parse(data);

            console.log(`Migrating ${model} model...`);
            await migrateData(objs, model);
            console.log(`✅ Successfully migrated ${model}`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    `❌ Failed to migrate ${model}: ${error.message}`
                );
            } else {
                console.error(`❌ Failed to migrate ${model}: ${error}`);
            }
        }
    }
}

migrate();
