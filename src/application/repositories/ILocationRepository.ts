import { Localita } from "../../domain/value_objects/Localita";

export interface ILocationRepository {
  getByID(id: number): Localita
}