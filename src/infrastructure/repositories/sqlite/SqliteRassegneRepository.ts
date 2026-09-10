import { Database } from "better-sqlite3";
import { IRassegneRepository } from "../../../application/repositories/IRassegneRepository";
import { Rassegna } from "../../../domain/entities/Rassegna";
import { RassegnaProgrammata } from "../../../domain/entities/RassegnaProgrammata";

export class SqliteRassegneRepository implements IRassegneRepository {

  constructor(private database: Database) {}
  
  public getScheduledEvents(): Array<RassegnaProgrammata> {
    const query = this.database.prepare("SELECT * FROM RASSEGNE_PROGRAMMATE")
    const result = query.all()
    return result as Array<Rassegna>
  }
  
  public getPastEvents(): Array<Rassegna> {
    const query = this.database.prepare("SELECT * FROM RASSEGNE")
    const result = query.all()
    return result as Array<Rassegna>
  }
}