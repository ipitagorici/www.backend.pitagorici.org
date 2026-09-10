import { Foto } from "../../domain/entities/Foto";
import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { PastRassegnaDTO } from "./PastRassegnaDTO";

export type PastRassegnaWithFotoDTO = PastRassegnaDTO & { foto: Foto[] } & { locandina?: Omit<MaterialePubblicitario, "rassegna_id"> };