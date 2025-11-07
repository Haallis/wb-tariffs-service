import knex, { migrate, seed } from "#postgres/knex.js";
import getWBTariffs from "#services/ wb/wb-client.js";

await migrate.latest();
await seed.run();

getWBTariffs();
console.log("All migrations and seeds have been run");
