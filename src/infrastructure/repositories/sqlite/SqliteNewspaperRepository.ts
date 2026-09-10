import { Database } from "better-sqlite3";
import { INewspaperRepository } from "../../../application/repositories/INewspaperRepository";
import { TestataGiornalistica } from "../../../domain/value_objects/TestataGiornalistica";

export class SqliteNewspaperRepository implements INewspaperRepository {

  constructor(private database: Database) { }
  
  getByID(id: number): TestataGiornalistica {
    const query = this.database.prepare("SELECT * FROM TESTATE_GIORNALISTICHE WHERE id = ?")
    return query.get(id) as TestataGiornalistica
  }
  
}