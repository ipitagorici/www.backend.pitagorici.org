import { IRassegneRepository } from "../../../application/repositories/IRassegneRepository";
import { Rassegna } from "../../../domain/entities/Rassegna";
import { RassegnaProgrammata } from "../../../domain/entities/RassegnaProgrammata";

export class SQLRassegneRepository implements IRassegneRepository {
  getById(id: number): Rassegna {
    throw new Error("Method not implemented.");
  }
  getScheduledEvents(): Array<RassegnaProgrammata> {
    throw new Error("Method not implemented.");
  }
  getPastEvents(): Array<Rassegna> {
    throw new Error("Method not implemented.");
  }
}