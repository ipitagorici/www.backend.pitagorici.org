import { Album } from "../../domain/entities/Album";
import { Fotografo } from "../../domain/entities/Fotografo";
import { QueryResult } from "../../shared_kernel/Result";

export interface IAlbumRepository {
  getByRassegnaID(rassegnaID: number): QueryResult<Album>;
  getCreditsByAlbumID(albumID: string): QueryResult<Fotografo[]>;
}