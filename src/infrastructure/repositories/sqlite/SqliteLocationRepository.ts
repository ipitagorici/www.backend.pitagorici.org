import { Database } from "better-sqlite3";
import { ILocationRepository } from "../../../application/repositories/ILocationRepository";
import { Localita } from "../../../domain/value_objects/Localita";
import { QueryResult } from "../../../shared_kernel/Result";
import SqliteGenericRepository from "./SqliteGenericRepository";

export class SqliteLocationRepository implements ILocationRepository {

  private sqliteRepo: SqliteGenericRepository
  
  public constructor(private database: Database) { 
    this.sqliteRepo = new SqliteGenericRepository(database)
  }
  
  public getByID(id: number): QueryResult<Localita> {
    return this.sqliteRepo.get<Localita>("SELECT * FROM Localita WHERE id = ?", id)
  }
}