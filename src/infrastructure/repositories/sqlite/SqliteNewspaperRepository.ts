import { Database } from "better-sqlite3";
import { INewspaperRepository } from "../../../application/repositories/INewspaperRepository";
import { TestataGiornalistica } from "../../../domain/value_objects/TestataGiornalistica";
import { QueryResult } from "../../../shared_kernel/Result";
import SqliteGenericRepository from "./SqliteGenericRepository";

export class SqliteNewspaperRepository implements INewspaperRepository {

  private sqliteRepo: SqliteGenericRepository
  
  public constructor(private database: Database) { 
    this.sqliteRepo = new SqliteGenericRepository(database)
  }
  
  getByID(id: number): QueryResult<TestataGiornalistica> {
    return this.sqliteRepo.get<TestataGiornalistica>("SELECT * FROM TESTATE_GIORNALISTICHE WHERE id = ?", id)
  }
  
}