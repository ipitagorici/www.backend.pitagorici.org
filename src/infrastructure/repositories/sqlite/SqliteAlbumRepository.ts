import { Database } from "better-sqlite3";
import { IAlbumRepository } from "../../../application/repositories/IAlbumRepository";
import { Album } from "../../../domain/entities/Album";
import { QueryResult } from "../../../shared_kernel/Result";
import { Error } from "../../../shared_kernel/Error";
import SqliteGenericRepository from "./SqliteGenericRepository";
import { Fotografo } from "../../../domain/entities/Fotografo";

export class SqliteAlbumRepository implements IAlbumRepository {

  private sqliteRepo: SqliteGenericRepository
  
  public constructor(private database: Database) { 
    this.sqliteRepo = new SqliteGenericRepository(database)
  }

  getByRassegnaID(rassegnaID: number): QueryResult<Album> {
    return this.sqliteRepo.get<Album>("SELECT * FROM ALBUM WHERE rassegna_id = ?", rassegnaID);
  }
  
  getCreditsByAlbumID(albumID: string): QueryResult<Fotografo[]> {
    return this.sqliteRepo.getMany<Fotografo>(`SELECT Nome, Cognome 
      FROM FOTOGRAFI f JOIN FOTOGRAFI_ALBUM fa ON f.id = fa.id_fotografo
      WHERE fa.id_album = ?`, albumID);
  }
}