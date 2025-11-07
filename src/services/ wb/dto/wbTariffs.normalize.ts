import { z } from "zod";
import { DTO, NormDTO } from "../types.js";

function replaceWithNull(val: string): null | undefined {
    if (val === "" || val === "-") return null;
}

export const normalizedDTOSchema = z.array(
    z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        geo_name: z.string(),
        warehouse_name: z.string(),
        box_delivery_base: z.number(),
        box_delivery_coef_expr: z.number(),
        box_delivery_liter: z.number(),
        box_delivery_marketplace_base: z.number(),
        box_delivery_marketplace_coef_expr: z.number(),
        box_delivery_marketplace_liter: z.number(),
        box_storage_base: z.number(),
        box_storage_coef_expr: z.number(),
        box_storage_liter: z.number(),
    }),
);

export function normalizeDTO(dto: DTO): NormDTO {
    const date = dto.response.data.dtTillMax;
    return normalizedDTOSchema.parse(
        dto.response.data.warehouseList.map((w) => {
            return {
                date: date,
                geo_name: w.geoName,
                warehouse_name: w.warehouseName,
                box_delivery_base: replaceWithNull(w.boxDeliveryBase) ?? Number(w.boxDeliveryBase.replace(",", ".")),
                box_delivery_coef_expr: replaceWithNull(w.boxDeliveryCoefExpr) ?? Number(w.boxDeliveryBase.replace(",", ".")),
                box_delivery_liter: replaceWithNull(w.boxDeliveryLiter) ?? Number(w.boxDeliveryBase.replace(",", ".")),
                box_delivery_marketplace_base: replaceWithNull(w.boxDeliveryMarketplaceBase) ?? Number(w.boxDeliveryBase.replace(",", ".")),
                box_delivery_marketplace_coef_expr: replaceWithNull(w.boxDeliveryMarketplaceCoefExpr) ?? Number(w.boxDeliveryBase.replace(",", ".")),
                box_delivery_marketplace_liter: replaceWithNull(w.boxDeliveryMarketplaceLiter) ?? Number(w.boxDeliveryBase.replace(",", ".")),
                box_storage_base: replaceWithNull(w.boxStorageBase) ?? Number(w.boxDeliveryBase.replace(",", ".")),
                box_storage_coef_expr: replaceWithNull(w.boxStorageCoefExpr) ?? Number(w.boxDeliveryBase.replace(",", ".")),
                box_storage_liter: replaceWithNull(w.boxStorageLiter) ?? Number(w.boxDeliveryBase.replace(",", ".")),
            };
        }),
    );
}
