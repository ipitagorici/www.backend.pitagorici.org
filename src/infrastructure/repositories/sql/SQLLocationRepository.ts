import { ILocationRepository } from "../../../application/repositories/ILocationRepository";
import { Localita } from "../../../domain/value_objects/Localita";

export class SQLLocationRepository implements ILocationRepository {
  getByID(id: number): Localita {
    throw new Error("Method not implemented.");
  }
}