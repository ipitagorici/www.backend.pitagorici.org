import { Album } from "../../domain/entities/Album";

export interface IAlbumRepository {
  getByRassegnaID(rassegnaID: number): Album;
}