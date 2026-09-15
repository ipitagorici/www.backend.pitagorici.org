import { Database } from "better-sqlite3";
import { IRassegneRepository } from "../../../application/repositories/IRassegneRepository";
import { Rassegna } from "../../../domain/entities/Rassegna";
import { RassegnaProgrammata } from "../../../domain/entities/RassegnaProgrammata";
import SqliteGenericRepository from "./SqliteGenericRepository";
import { QueryResult } from "../../../shared_kernel/Result";

export class SqliteRassegneRepository implements IRassegneRepository {

  private sqliteRepo: SqliteGenericRepository
  
  public constructor(private database: Database) { 
    this.sqliteRepo = new SqliteGenericRepository(database)
  }
  
  public getScheduledEvents(): QueryResult<RassegnaProgrammata[]> {
    return this.sqliteRepo.getMany<RassegnaProgrammata>("SELECT * FROM RASSEGNE_PROGRAMMATE")
  }
  
  public getPastEvents(): QueryResult<Rassegna[]> {
    return this.sqliteRepo.getMany<Rassegna>("SELECT * FROM RASSEGNE")
  }
  
  public getPastEventByID(id: number): QueryResult<Rassegna> {
    return this.sqliteRepo.get<Rassegna>("SELECT * FROM RASSEGNE WHERE id = ?", id)
  }
}