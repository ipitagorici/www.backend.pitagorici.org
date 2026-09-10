import { Database } from "better-sqlite3";
import { IArticleRepository } from "../../../application/repositories/IArticleRepository";
import { Articolo } from "../../../domain/entities/Articolo";

export class SqliteArticleRepository implements IArticleRepository {

  public constructor(private database: Database) { }
  
  public getAll(): Articolo[] {
    const query = this.database.prepare("SELECT * FROM ARTICOLI")
    return query.all() as Articolo[]
  }

  public getByRassegnaID(rassegnaID: number): Articolo[] {
    const query = this.database.prepare("SELECT * FROM ARTICOLI WHERE rassegna_id = ?")
    return query.all(rassegnaID) as Articolo[]
  }

} 