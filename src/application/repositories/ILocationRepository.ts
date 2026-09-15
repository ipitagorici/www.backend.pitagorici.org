import { Localita } from "../../domain/value_objects/Localita";
import { QueryResult } from "../../shared_kernel/Result";

export interface ILocationRepository {
  getByID(id: number): QueryResult<Localita>
}