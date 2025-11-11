import knex from "#postgres/knex.js";
import { google } from "googleapis";
import path from "path";

export async function getSheetsClient() {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    return sheets;
}

export async function updateTariffsInSheets() {
    const sheetIds = process.env.GOOGLE_SHEET_IDS || "";

    const ids = sheetIds
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id);

    if (!ids.length) {
        console.log("Нет ID таблиц для обновления");
        return;
    }

    const sheets = await getSheetsClient();

    const header = [
        "date",
        "geo_name",
        "warehouse_name",
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

    const tariffs = await knex("tariffs").select("*").whereRaw("date = CURRENT_DATE").orderBy("box_delivery_coef_expr", "asc");

    const sheetRows = tariffs.map((t) => [
        new Date(t.date).toLocaleDateString("en-CA"),
        t.geo_name,
        t.warehouse_name,
        t.box_delivery_base,
        t.box_delivery_coef_expr,
        t.box_delivery_liter,
        t.box_delivery_marketplace_base,
        t.box_delivery_marketplace_coef_expr,
        t.box_delivery_marketplace_liter,
        t.box_storage_base,
        t.box_storage_coef_expr,
        t.box_storage_liter,
    ]);

    const mappedData = [header, ...sheetRows];

    await Promise.all(
        ids.map(async (id) => {
            console.log(`Обновляем таблицу: ${id}`);

            await sheets.spreadsheets.values.clear({
                spreadsheetId: id,
                range: "stocks_coefs",
            });

            await sheets.spreadsheets.values.update({
                spreadsheetId: id,
                range: "stocks_coefs",
                valueInputOption: "USER_ENTERED",
                requestBody: { values: mappedData },
            });

            console.log(`Таблица ${id} обновлена`);
        }),
    );

    console.log("Все гугл таблицы успешно обновлены");
}
