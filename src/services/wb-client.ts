type WbTariffResponse = {

}

async function getWBTariffs() {
    const actualDateFormated = new Date().toISOString().slice(0, 10);

    const url = `https://common-api.wildberries.ru/api/v1/tariffs/box?date=${actualDateFormated}`;

    const TOKEN = process.env.TOKEN;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}
export default getWBTariffs;
