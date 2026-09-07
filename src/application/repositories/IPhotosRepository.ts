import { Foto } from "../../domain/entities/Foto";

export interface IPhotosRepository {
  getByRassegnaID(rassegnaID: number): Array<Foto>;
  getRandom(quantity: number): Array<Foto>;
}