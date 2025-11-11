import { z } from "zod";
import { DTO, NormDTO } from "../types.js";

export const normalizedDTOSchema = z.array(
    z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        geo_name: z.string().nullable(),
        warehouse_name: z.string(),
        box_delivery_base: z.number().nullable(),
        box_delivery_coef_expr: z.number().nullable(),
        box_delivery_liter: z.number().nullable(),
        box_delivery_marketplace_base: z.number().nullable(),
        box_delivery_marketplace_coef_expr: z.number().nullable(),
        box_delivery_marketplace_liter: z.number().nullable(),
        box_storage_base: z.number().nullable(),
        box_storage_coef_expr: z.number().nullable(),
        box_storage_liter: z.number().nullable(),
    }),
);

function parseWarehouseCoefs(coef: string) {
    if (coef === "" || coef === "-") {
        return null;
    }
    return Number(coef.replace(",", "."));
}

export function normalizeDTO(dto: DTO): NormDTO {
    return normalizedDTOSchema.parse(
        dto.response.data.warehouseList.map((w) => {
            return {
                date: new Date().toLocaleDateString("en-CA").slice(0, 10),
                geo_name: w.geoName === "" ? null : w.geoName,
                warehouse_name: w.warehouseName,
                box_delivery_base: parseWarehouseCoefs(w.boxDeliveryBase),

                box_delivery_coef_expr: parseWarehouseCoefs(w.boxDeliveryCoefExpr),
                box_delivery_liter: parseWarehouseCoefs(w.boxDeliveryLiter),
                box_delivery_marketplace_base: parseWarehouseCoefs(w.boxDeliveryMarketplaceBase),
                box_delivery_marketplace_coef_expr: parseWarehouseCoefs(w.boxDeliveryMarketplaceCoefExpr),
                box_delivery_marketplace_liter: parseWarehouseCoefs(w.boxDeliveryMarketplaceLiter),
                box_storage_base: parseWarehouseCoefs(w.boxStorageBase),
                box_storage_coef_expr: parseWarehouseCoefs(w.boxStorageCoefExpr),
                box_storage_liter: parseWarehouseCoefs(w.boxStorageLiter),
            };
        }),
    );
}
