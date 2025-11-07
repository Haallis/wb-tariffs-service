import { z } from "zod";

const warehouseSchema = z.object({
    boxDeliveryBase: z.string(),
    boxDeliveryCoefExpr: z.string(),
    boxDeliveryLiter: z.string(),
    boxDeliveryMarketplaceBase: z.string(),
    boxDeliveryMarketplaceCoefExpr: z.string(),
    boxDeliveryMarketplaceLiter: z.string(),
    boxStorageBase: z.string(),
    boxStorageCoefExpr: z.string(),
    boxStorageLiter: z.string(),
    geoName: z.string(),
    warehouseName: z.string(),
});

export const dtoSchema = z.object({
    response: z.object({
        data: z
            .object({
                dtNextBox: z.string(),
                dtTillMax: z.string(),
                warehouseList: z.array(warehouseSchema),
            })
            .strict(),
    }),
});
