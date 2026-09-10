import { Database } from "better-sqlite3";
import { ILocationRepository } from "../../../application/repositories/ILocationRepository";
import { Localita } from "../../../domain/value_objects/Localita";

export class SqliteLocationRepository implements ILocationRepository {
  
  public constructor(private database: Database) { }
  
  public getByID(id: number): Localita {
    const query = this.database.prepare("SELECT * FROM Localita WHERE id = ?");
    const result: Localita | undefined = query.get(id) as Localita;
    return result;
  }
}