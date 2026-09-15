import { Articolo } from "../../domain/entities/Articolo";
import { QueryResult } from "../../shared_kernel/Result";

export interface IArticleRepository {
  getAll(): QueryResult<Articolo[]>;
  getByRassegnaID(rassegnaID: number): QueryResult<Articolo[]>;
}