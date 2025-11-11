import knex from "#postgres/knex.js";
import { normalizeDTO } from "./dto/wbTariffs.normalize.js";
import getWbTariffs from "./wb-client.js";

export async function generateDBRecs(): Promise<void> {
    const dto = await getWbTariffs();
    const newRecs = normalizeDTO(dto);

    const date = newRecs[0].date;
    const sameDateOldRecs = await knex("tariffs").where({ date });

    if (sameDateOldRecs.length === 0) {
        await knex("tariffs").insert(newRecs);
        return;
    }

    const sameDateOldRecsByWarehouse = Object.fromEntries(sameDateOldRecs.map((r) => [r.warehouse_name, r]));

    const recordsToUpdate = [];

    for (const newRec of newRecs) {
        const oldRec = sameDateOldRecsByWarehouse[newRec.warehouse_name];

        if (isTariffChanged(oldRec, newRec)) {
            recordsToUpdate.push(newRec);
        }
    }

    if (recordsToUpdate.length === 0) {
        console.log(`Тарифы за ${date} не изменились`);
        return;
    }

    console.log(`Обновляем ${recordsToUpdate.length} тарифов за ${date}`);

    await knex("tariffs").insert(recordsToUpdate).onConflict(["date", "warehouse_name"]).merge();
}

function isTariffChanged(oldRec: any, newRec: any): boolean {
    const keysToCompare = [
        "box_delivery_base",
        "box_delivery_coef_expr",
        "box_delivery_liter",
        "box_delivery_marketplace_base",
        "box_delivery_marketplace_coef_expr",
        "box_delivery_marketplace_liter",
        "box_storage_base",
        "box_storage_coef_expr",
        "box_storage_liter",
    ];

    if (!oldRec) return true;

    for (const key of keysToCompare) {
        const oldVal = oldRec[key] === null ? null : Number(oldRec[key]);

        const newVal = newRec[key];

        if (oldVal !== newVal) {
            return true;
        }
    }

    return false;
}
