import { Foto } from "../../domain/entities/Foto";
import { Rassegna } from "../../domain/entities/Rassegna";
import { PastRassegnaDTO } from "../dto/PastRassegnaDTO";

export class PastRassegnaMapper {
  public static toDTO(rassegna: Rassegna, location: { nome: string, citta: string }, cover?: Foto): PastRassegnaDTO {
    const { localita_id, ...restRassegna } = rassegna
    return { ...restRassegna, localita: location, cover }
  }
}