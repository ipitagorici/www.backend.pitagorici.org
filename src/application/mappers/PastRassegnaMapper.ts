import { Foto } from "../../domain/entities/Foto";
import { Rassegna } from "../../domain/entities/Rassegna";
import { PastRassegnaDTO } from "../dto/PastRassegnaDTO";

export class PastRassegnaMapper {
  public static toDTO(rassegna: Rassegna, location: { nome: string, citta: string }, cover?: Foto): PastRassegnaDTO {
    const { id, nome, data, ora, descrizione, videoYT, sottotitolo } = rassegna;
    return {
      id,
      sottotitolo,
      nome,
      data,
      ora,
      descrizione,
      videoYT,
      localita: { nome: location.nome, citta: location.citta },
      cover
    }
  }
}