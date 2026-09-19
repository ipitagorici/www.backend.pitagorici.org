import { ISponsorsRepository } from "@/application/repositories/ISponsorsRepository";
import { Sponsor } from "@/domain/entities/Sponsor";
import { QueryResult } from "@/shared_kernel/Result";
import SqliteGenericRepository from "./SqliteGenericRepository";
import { Database } from "better-sqlite3";

export default class SqliteSponsorRepository implements ISponsorsRepository {

  private sqliteRepo: SqliteGenericRepository
  
  public constructor(private database: Database) { 
    this.sqliteRepo = new SqliteGenericRepository(database)
  }
  
  public getAll(): QueryResult<Sponsor[]> {
    return this.sqliteRepo.getMany<Sponsor>("SELECT * FROM SPONSORS")
  }
  
}