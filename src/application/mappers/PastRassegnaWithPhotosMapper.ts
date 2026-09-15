import { Foto } from "../../domain/entities/Foto";
import { Fotografo } from "../../domain/entities/Fotografo";
import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { Rassegna } from "../../domain/entities/Rassegna";
import { PastRassegnaWithFotoDTO } from "../dto/PastRassegnaWithFotoDTO";

export class PastRassegnaWithPhotosMapper {
  public static toDTO(
    rassegna: Rassegna,
    location: { nome: string; citta: string },
    photos: { credits: Fotografo[]; pictures: Foto[] },
    locandina?: MaterialePubblicitario,
  ): PastRassegnaWithFotoDTO {
    const { localita_id, ...restRassegna } = rassegna;
    const { rassegna_id, ...restLocandina } = locandina ?? {};
    return {
      ...restRassegna,
      localita: location,
      foto: {
        crediti: photos.credits,
        immagini: photos.pictures
      },
      locandina: { ...restLocandina },
    } as PastRassegnaWithFotoDTO;
  }
}
