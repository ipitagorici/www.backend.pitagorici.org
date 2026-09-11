import { Database } from "better-sqlite3";
import { IAlbumRepository } from "../../../application/repositories/IAlbumRepository";
import { Album } from "../../../domain/entities/Album";

export class SqliteAlbumRepository implements IAlbumRepository {

  public constructor(private database: Database) { }

  getByRassegnaID(rassegnaID: number): Album {
    const query = this.database.prepare("SELECT * FROM ALBUM WHERE rassegna_id = ?")
    const result = query.get(rassegnaID)
    return result as Album
  }
}