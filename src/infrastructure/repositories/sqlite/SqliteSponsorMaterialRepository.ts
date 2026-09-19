import { ISponsorMaterialRepository } from "@/application/repositories/ISponsorMaterialRepository";
import { MaterialePubblicitario } from "@/domain/entities/MaterialePubblicitario";
import { QueryResult } from "@/shared_kernel/Result";
import SqliteGenericRepository from "./SqliteGenericRepository";
import { Database } from "better-sqlite3";

export default class SqliteSponsorMaterialRepository implements ISponsorMaterialRepository {

  private sqliteRepo: SqliteGenericRepository
  
  public constructor(private database: Database) { 
    this.sqliteRepo = new SqliteGenericRepository(database)
  }

  getByRassegnaID(rassegnaID: number): QueryResult<MaterialePubblicitario> {
    return this.sqliteRepo.get<MaterialePubblicitario>("SELECT * FROM MATERIALI_PUBBLICITARI WHERE rassegna_id = ?", rassegnaID)
  }
  
}