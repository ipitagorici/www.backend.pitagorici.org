import { Foto } from "../../domain/entities/Foto";
import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { Rassegna } from "../../domain/entities/Rassegna";
import { PastRassegnaWithFotoDTO } from "../dto/PastRassegnaWithFotoDTO";

export class PastRassegnaWithPhotosMapper {
  public static toDTO(rassegna: Rassegna, location: { nome: string, citta: string }, photos: Foto[], locandina?: MaterialePubblicitario): PastRassegnaWithFotoDTO {
    const { localita_id, ...restRassegna } = rassegna;
    const { rassegna_id, ...restLocandina } = locandina ?? {}; 
    return {
      ...restRassegna,
      localita: location,
      foto: photos,
      locandina: { ...restLocandina },
    } as PastRassegnaWithFotoDTO;
  }
} 