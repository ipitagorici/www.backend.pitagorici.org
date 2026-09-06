import { Rassegna } from "../../domain/entities/Rassegna";

interface IRassegneRepository {
  getById(id: number): Rassegna
  getAll(): Array<Rassegna>
}