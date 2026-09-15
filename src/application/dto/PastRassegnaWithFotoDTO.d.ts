import { Foto } from "../../domain/entities/Foto";
import { Fotografo } from "../../domain/entities/Fotografo";
import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { PastRassegnaDTO } from "./PastRassegnaDTO";

export type PastRassegnaWithFotoDTO = PastRassegnaDTO &
{
  foto: {
    crediti: Fotografo[],
    immagini: Foto[]
  } &
  {
    locandina?: Omit<MaterialePubblicitario, "rassegna_id">
  }
};
