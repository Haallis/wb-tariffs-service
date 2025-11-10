import knex, { migrate, seed } from "#postgres/knex.js";
import { updateTariffsInSheets } from "#services/google-api/google_sheets.js";
import getWBTariffs from "#services/ wb/wb-client.js";

await migrate.latest();
await seed.run();
console.log("All migrations and seeds have been run");

updateTariffsInSheets();
