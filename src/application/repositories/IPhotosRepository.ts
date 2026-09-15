import { Foto } from "../../domain/entities/Foto";
import { QueryResult } from "../../shared_kernel/Result";

export interface IPhotosRepository {
  getByAlbumID(albumID: string): Promise<QueryResult<Foto[]>>;
  getRassegnaCoverByAlbumID(albumID: string): Promise<QueryResult<Foto>>;
}