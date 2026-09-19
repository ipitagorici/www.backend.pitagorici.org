import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { RassegnaProgrammata } from "../../domain/entities/RassegnaProgrammata";
import { Localita } from "../../domain/value_objects/Localita";
import { RassegnaProgrammataDTO } from "../dto/RassegnaProgrammataDTO";

export class RassegnaProgrammataMapper {
  public static toDTO(rassegna: RassegnaProgrammata, localita: Localita, locandina: MaterialePubblicitario): RassegnaProgrammataDTO {
    const { id, nome, data, ora, descrizione, link_prenotazione, sottotitolo } = rassegna;
    const { nome: nomeLocalita, via, citta, latitudine, longitudine } = localita;
    const { id: idLocandina, nome: nomeLocandina, altezza, larghezza, contenuto } = locandina;
    return {
      id,
      nome,
      sottotitolo,
      data,
      ora,
      descrizione,
      link_prenotazione,
      localita: {
        nome: nomeLocalita,
        via,
        citta,
        latitudine,
        longitudine
      },
      locandina: {
        id: idLocandina,
        nome: nomeLocandina,
        altezza,
        larghezza,
        contenuto
      }
    }
  }
}