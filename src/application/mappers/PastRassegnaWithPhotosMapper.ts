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
    const { id, nome, data, ora, descrizione, videoYT, cover, sottotitolo } = rassegna;
    return {
      id,
      sottotitolo,
      nome,
      data,
      ora,
      descrizione,
      videoYT,
      cover,
      localita: { nome: location.nome, citta: location.citta },
      locandina: locandina ? {
        id: locandina.id,
        nome: locandina.nome,
        altezza: locandina.altezza,
        larghezza: locandina.larghezza,
        contenuto: locandina.contenuto
      } : { } as Omit<MaterialePubblicitario, "rassegna_id">,
      foto: {
        crediti: photos.credits,
        immagini: photos.pictures,
      }
    }
  }
}