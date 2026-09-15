import { Database } from "better-sqlite3";
import { IArticleRepository } from "../../../application/repositories/IArticleRepository";
import { Articolo } from "../../../domain/entities/Articolo";
import { QueryResult } from "../../../shared_kernel/Result";
import SqliteGenericRepository from "./SqliteGenericRepository";

export class SqliteArticleRepository implements IArticleRepository {

  private sqliteRepo: SqliteGenericRepository
  
  public constructor(private database: Database) { 
    this.sqliteRepo = new SqliteGenericRepository(database)
  }
  
  public getAll(): QueryResult<Articolo[]> {
    return this.sqliteRepo.getMany<Articolo>("SELECT * FROM ARTICOLI")
  }

  public getByRassegnaID(rassegnaID: number): QueryResult<Articolo[]> {
    return this.sqliteRepo.getMany<Articolo>("SELECT * FROM ARTICOLI WHERE rassegna_id = ?", rassegnaID)
  }

} 