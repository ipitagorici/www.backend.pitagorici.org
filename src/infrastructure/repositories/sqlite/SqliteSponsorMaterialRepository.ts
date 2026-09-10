import { Database } from "better-sqlite3";
import { ISponsorMaterialRepository } from "../../../application/repositories/ISponsorMaterialRepository";
import { MaterialePubblicitario } from "../../../domain/entities/MaterialePubblicitario";

export class SqliteSponsorMaterialRepository implements ISponsorMaterialRepository {

  constructor(private database: Database) { }
  
  getByRassegnaID(rassegnaID: number): MaterialePubblicitario {
    const query = this.database.prepare("SELECT * FROM MATERIALI_PUBBLICITARI WHERE rassegna_id = ?")
    return query.get(rassegnaID) as MaterialePubblicitario
  }
  
}