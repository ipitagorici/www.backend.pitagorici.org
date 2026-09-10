import { ILocationRepository } from "../../../application/repositories/ILocationRepository";
import { Localita } from "../../../domain/value_objects/Localita";

export default class InMemoryLocationRepository implements ILocationRepository {
  getByID(id: number): Localita {
    throw new Error("Method not implemented.");
  }
}