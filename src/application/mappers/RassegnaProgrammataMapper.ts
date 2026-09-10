import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { RassegnaProgrammata } from "../../domain/entities/RassegnaProgrammata";
import { Localita } from "../../domain/value_objects/Localita";
import { RassegnaProgrammataDTO } from "../dto/RassegnaProgrammataDTO";

export class RassegnaProgrammataMapper {
  public static toDTO(rassegna: RassegnaProgrammata, localita: Localita, locandina: MaterialePubblicitario): RassegnaProgrammataDTO {
    return { ...rassegna, ...localita, ...locandina } as RassegnaProgrammataDTO;
  }
}