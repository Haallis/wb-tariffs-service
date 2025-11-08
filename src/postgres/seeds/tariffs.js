import { generateDBRecs } from "#services/ wb/save-DB.js";

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    // await knex("table_name").del();
    // await knex("table_name").insert([
    //     { id: 1, colName: "rowValue1" },
    //     { id: 2, colName: "rowValue2" },
    //     { id: 3, colName: "rowValue3" },
    // ]);
    await generateDBRecs();
}
