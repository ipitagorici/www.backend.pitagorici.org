import { Foto } from "../../domain/entities/Foto";
import { FotoDTO } from "../dto/FotoDTO";

export class FotoMapper {
  public static toDTO(foto: Foto): FotoDTO {
    const { album_id, ...rest } = foto;
    return rest 
  }
} 