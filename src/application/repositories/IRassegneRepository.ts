import { Rassegna } from "../../domain/entities/Rassegna";
import { RassegnaProgrammata } from "../../domain/entities/RassegnaProgrammata";

export interface IRassegneRepository {
  getScheduledEvents(): Array<RassegnaProgrammata>
  getPastEvents(): Array<Rassegna>,
}