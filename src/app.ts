import knex, { migrate, seed } from "#postgres/knex.js";
import getWBTariffs from "#services/wb-client.js";

await migrate.latest();
await seed.run();

// console.log(typeof getWBTariffs());
console.log("All migrations and seeds have been run");
