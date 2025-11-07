import { z } from "zod";
import { dtoSchema } from "./dto/wbBoxTariffs.valid.js";
import { normalizedDTOSchema } from "./dto/wbTariffs.normalize.js";

export type DTO = z.infer<typeof dtoSchema>;
export type NormDTO = z.infer<typeof normalizedDTOSchema>;
