import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { QueryResult } from "../../shared_kernel/Result";

export interface ISponsorMaterialRepository {
  getByRassegnaID(rassegnaID: number): QueryResult<MaterialePubblicitario>
}