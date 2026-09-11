import { Foto } from "../../domain/entities/Foto";

export interface IPhotosRepository {
  getByAlbumID(albumID: string): Promise<Array<Foto>>;
  getRandom(quantity: number): Promise<Array<Foto>>;
}