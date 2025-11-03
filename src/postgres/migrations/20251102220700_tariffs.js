/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("tariffs", (table) => {
        table.increments("id");
        table.date("date");
        table.smallint("warehouse_id");
        table.smallint("region_id");
        table.decimal("box_delivery_base", 8, 3);
        table.decimal("box_delivery_coef", 8, 3);
        table.decimal("box_delivery_liter", 8, 3);
        table.decimal("box_delivery_marketplace_base", 8, 3);
        table.decimal("box_delivery_marketplace_coef", 8, 3);
        table.decimal("box_delivery_marketplace_liter", 8, 3);
        table.decimal("box_storage_base", 8, 3);
        table.decimal("box_storage_coef", 8, 3);
        table.decimal("box_storage_liter", 8, 3);
        table.time("updated_at");
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("tariffs");
}
