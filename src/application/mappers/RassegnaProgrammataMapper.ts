import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { RassegnaProgrammata } from "../../domain/entities/RassegnaProgrammata";
import { Localita } from "../../domain/value_objects/Localita";
import { RassegnaProgrammataDTO } from "../dto/RassegnaProgrammataDTO";

export class RassegnaProgrammataMapper {
  public static toDTO(rassegna: RassegnaProgrammata, localita: Localita, locandina: MaterialePubblicitario): RassegnaProgrammataDTO {
    const { localita_id, ...restRassegna } = rassegna;
    const { id, ...restLocalita } = localita;
    const { rassegna_id, ...restLocandina } = locandina;
    return {
      ...restRassegna,
      localita: { ...restLocalita },
      locandina: { ...restLocandina }
    } as RassegnaProgrammataDTO;
  }
}