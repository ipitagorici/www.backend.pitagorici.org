import { Articolo } from "../../domain/entities/Articolo";

export interface IArticleRepository {
  getAll(): Articolo[];
  getByRassegnaID(rassegnaID: number): Articolo[];
}