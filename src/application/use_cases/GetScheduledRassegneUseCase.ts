import { IRassegneRepository } from "../repositories/IRassegneRepository";
import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { RassegnaProgrammataDTO } from "../dto/RassegnaProgrammataDTO";
import { ILocationRepository } from "../repositories/ILocationRepository";
import { RassegnaProgrammataMapper } from "../mappers/RassegnaProgrammataMapper";
import { ISponsorMaterialRepository } from "../repositories/ISponsorMaterialRepository";
import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";

export class GetScheduledRassegneUseCase {

  constructor(
    private rassegneRepository: IRassegneRepository,
    private localitaRepository: ILocationRepository,
    private sponsoringMaterialRepository: ISponsorMaterialRepository
  ) { }

  public execute(): QueryResult<RassegnaProgrammataDTO[]> {
    const eventsQuery = this.rassegneRepository.getScheduledEvents()
    if (eventsQuery.isFailure()) {
      QueryResult.fail(Error.notFound("No scheduled events now. Let us cook!"), [])
    }
    const events = eventsQuery.getValue()
    const correspondingLocationsQueryResults = events.map(rassegna => this.localitaRepository.getByID(rassegna.localita_id))
    if (correspondingLocationsQueryResults.some(qr => qr.isFailure())) {
      QueryResult.fail(Error.failure("Something went wrong when fetching locations for each scheduled event."), [])
    }
    const correspondingLocations = correspondingLocationsQueryResults.map(qr => qr.getValue())
    const sponsoringMaterialsQueryResults = events.map(rassegna => this.sponsoringMaterialRepository.getByRassegnaID(rassegna.id))
    const dtos = events
      .zipWith(correspondingLocations, sponsoringMaterialsQueryResults)
      .map(([event, location, sponsorMaterialQueryResult]) => {
        return RassegnaProgrammataMapper.toDTO(
          event,
          location,
          sponsorMaterialQueryResult.isFailure() ? {} as MaterialePubblicitario : sponsorMaterialQueryResult.getValue()
        )
      })
    return QueryResult.ok(dtos)
  }
}