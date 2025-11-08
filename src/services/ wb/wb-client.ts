// import { WbTariffResponse } from "./dto/wbBoxTariffs.valid.js";
import { dtoSchema } from "./dto/wbBoxTariffs.valid.js";
import { DTO } from "./types.js";

async function getWbTariffs(): Promise<DTO> | undefined {
    const actualDateFormated = new Date().toISOString().slice(0, 10);

    const url = `https://common-api.wildberries.ru/api/v1/tariffs/box?date=${actualDateFormated}`;

    const TOKEN = process.env.TOKEN;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const data = dtoSchema.parse(json);
        // console.log(data);
        return data;
    } catch (error) {
        console.error((error as Error).message);
    }
}
export default getWbTariffs;
