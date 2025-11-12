import { seed, migrate } from "#postgres/knex.js";
import { updateTariffsInSheets } from "#services/google-api/google_sheets.js";
import { CronJob } from "cron";

export function applyCron() {
    new CronJob(
        "0 * * * *",
        async () => {
            console.log("НОВЫЙ ЗАПРОС");
            await migrate.latest();
            await seed.run();
            console.log("All migrations and seeds have been run");
            updateTariffsInSheets();
        },
        null,
        true,
    );
}
