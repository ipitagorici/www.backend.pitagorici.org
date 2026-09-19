import { Sponsor } from "@/domain/entities/Sponsor";
import { QueryResult } from "@/shared_kernel/Result";

export interface ISponsorsRepository {
  getAll(): QueryResult<Sponsor[]>
}