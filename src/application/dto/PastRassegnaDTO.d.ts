import { Rassegna } from "../../domain/entities/Rassegna";
import { Localita } from "../../domain/value_objects/Localita";

export type PastRassegnaDTO = Omit<Rassegna, "localita_id"> & { localita: Pick<Localita, "nome" | "citta" > } 