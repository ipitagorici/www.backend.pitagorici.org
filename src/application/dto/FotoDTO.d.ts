import { Foto } from "../../domain/entities/Foto";

export type FotoDTO = Omit<Foto, "album_id">