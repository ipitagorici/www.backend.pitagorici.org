import { Database } from "better-sqlite3";
import { IPhotosRepository } from "../../../application/repositories/IPhotosRepository";
import { Foto } from "../../../domain/entities/Foto";

export class SqlitePhotosRepository implements IPhotosRepository {

  public constructor(private database: Database) { }
  
  public getByRassegnaID(rassegnaID: number): Array<Foto> {
    const query = this.database.prepare("SELECT * FROM Foto WHERE rassegna_id = ?")
    const result = query.all(rassegnaID) as Array<Foto>
    return result;
  }
  
  public getRandom(quantity: number): Array<Foto> {
    const query = this.database.prepare(
      "SELECT * FROM Foto" +
      "ORDER BY RANDOM() LIMIT ?"
    );
    const result = query.all(quantity) as Array<Foto>;
    return result;
  }
}