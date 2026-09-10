import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { RassegnaProgrammata } from "../../domain/entities/RassegnaProgrammata";
import { Localita } from "../../domain/value_objects/Localita";

export type RassegnaProgrammataDTO = Omit<RassegnaProgrammata, "localita_id"> & Omit<Localita, "id"> & Omit<MaterialePubblicitario, "rassegna_id">;