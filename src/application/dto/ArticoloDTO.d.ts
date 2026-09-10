import { Articolo } from "../../domain/entities/Articolo";
import { TestataGiornalistica } from "../../domain/value_objects/TestataGiornalistica";

export type ArticoloDTO = Omit<Articolo, "rassegna_id" | "testata_id"> & { testata: Omit<TestataGiornalistica, "id"> }