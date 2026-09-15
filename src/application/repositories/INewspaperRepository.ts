import { TestataGiornalistica } from "../../domain/value_objects/TestataGiornalistica";
import { QueryResult } from "../../shared_kernel/Result";

export interface INewspaperRepository {
  getByID(id: number): QueryResult<TestataGiornalistica>
}