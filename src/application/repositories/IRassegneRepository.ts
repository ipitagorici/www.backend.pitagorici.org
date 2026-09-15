import { Rassegna } from "../../domain/entities/Rassegna";
import { RassegnaProgrammata } from "../../domain/entities/RassegnaProgrammata";
import { QueryResult } from "../../shared_kernel/Result";

export interface IRassegneRepository {
  getScheduledEvents(): QueryResult<RassegnaProgrammata[]>
  getPastEvents(): QueryResult<Rassegna[]>,
  getPastEventByID(id: number): QueryResult<Rassegna>
}