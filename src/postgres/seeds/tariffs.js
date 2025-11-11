import { generateDBRecs } from "#services/ wb/save-DB.js";

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await generateDBRecs();
}
