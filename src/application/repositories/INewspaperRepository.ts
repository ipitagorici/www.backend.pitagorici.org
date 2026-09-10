import { TestataGiornalistica } from "../../domain/value_objects/TestataGiornalistica";

export interface INewspaperRepository {
  getByID(id: number): TestataGiornalistica
}