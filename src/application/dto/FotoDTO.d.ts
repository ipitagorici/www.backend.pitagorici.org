import { Foto } from "../../domain/entities/Foto";

export type FotoDTO = Omit<Foto, "rassegna_id">