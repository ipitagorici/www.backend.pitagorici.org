import { QueryResult } from "@/shared_kernel/Result";
import { ISponsorsRepository } from "../repositories/ISponsorsRepository";
import { SponsorDTO } from "../dto/SponsorDTO";
import { SponsorMapper } from "../mappers/SponsorMapper";
import { Error } from "@/shared_kernel/Error";

export class GetSponsorsUseCase {
  
  public constructor(
    private sponsorRepository: ISponsorsRepository
  ) { }

  execute(): QueryResult<SponsorDTO[]> {
    const sponsorsQueryResult = this.sponsorRepository.getAll()
    if (sponsorsQueryResult.isFailure()) {
      return QueryResult.fail(Error.notFound("No sponsors found!"), [] as SponsorDTO[])
    }
    return QueryResult.ok(
      sponsorsQueryResult
        .getValue()
        .map((sponsor) => SponsorMapper.toDTO(sponsor))
    )
  }
}