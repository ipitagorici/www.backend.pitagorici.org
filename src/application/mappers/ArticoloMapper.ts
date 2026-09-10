import { Articolo } from "../../domain/entities/Articolo";
import { TestataGiornalistica } from "../../domain/value_objects/TestataGiornalistica";
import { ArticoloDTO } from "../dto/ArticoloDTO";

export class ArticoloMapper {
  public static toDTO(articolo: Articolo, testata: TestataGiornalistica): ArticoloDTO {
    const { rassegna_id, testata_id, ...articoloData } = articolo;
    const { id, ...testataData } = testata;

    return {
      ...articoloData,
      testata: testataData,
    };
  }
}
