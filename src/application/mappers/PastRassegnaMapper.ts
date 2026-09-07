import { Rassegna } from "../../domain/entities/Rassegna";
import { PastRassegnaDTO } from "../dto/PastRassegnaDTO";

export class PastRassegnaMapper {
  public static toDTO(rassegna: Rassegna, location: { nome: string, citta: string }): PastRassegnaDTO {
    return { ...rassegna, localita: location }
  }
}