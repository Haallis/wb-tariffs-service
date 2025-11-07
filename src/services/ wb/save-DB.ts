import knex from "knex";
import { normalizeDTO } from "./dto/wbTariffs.normalize.js";
import getWbTariffs from "./wb-client.js";

async function generateDBTariffsRows(): Promise<void> {
    const dto = await getWbTariffs();
    const normalizedDto = normalizeDTO(dto);

    const date = normalizedDto[0].date;
    const sameDateRecords = await knex("tariffs").where({ date });

    if (sameDateRecords.length === 0) {
        await knex("tariffs").insert(normalizedDto);
        return;
    }

    // Если появляется новый склад, то записываем в БД



}
