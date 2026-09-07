import { RassegnaProgrammata } from "../../domain/entities/RassegnaProgrammata";
import { Localita } from "../../domain/value_objects/Localita";
import { RassegnaProgrammataDTO } from "../dto/RassegnaProgrammataDTO";

export class RassegnaProgrammataMapper {
  public static toDTO(rassegna: RassegnaProgrammata, localita: Localita): RassegnaProgrammataDTO {
    return { ...rassegna, ...localita } as RassegnaProgrammataDTO;
  }
}