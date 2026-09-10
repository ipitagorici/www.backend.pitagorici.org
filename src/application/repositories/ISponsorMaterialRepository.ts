import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";

export interface ISponsorMaterialRepository {
  getByRassegnaID(rassegnaID: number): MaterialePubblicitario
}