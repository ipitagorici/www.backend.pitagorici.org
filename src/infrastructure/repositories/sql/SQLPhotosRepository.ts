import { IPhotosRepository } from "../../../application/repositories/IPhotosRepository";
import { Foto } from "../../../domain/entities/Foto";

export class SQLPhotosRepository implements IPhotosRepository {
  getByRassegnaID(rassegnaID: number): Array<Foto> {
    throw new Error("Method not implemented.");
  }
  getRandom(quantity: number): Array<Foto> {
    throw new Error("Method not implemented.");
  }
}