import { Foto } from "../../domain/entities/Foto";
import { Rassegna } from "../../domain/entities/Rassegna";
import { PastRassegnaWithFotoDTO } from "../dto/PastRassegnaWithFotoDTO";

export class PastRassegnaWithPhotosMapper {
  public static toDTO(rassegna: Rassegna, location: { nome: string, citta: string }, photos: Foto[]): PastRassegnaWithFotoDTO {
    return { ...rassegna, localita: location, foto: photos } as PastRassegnaWithFotoDTO
  }
} 