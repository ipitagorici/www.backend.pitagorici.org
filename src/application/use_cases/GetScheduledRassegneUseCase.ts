import { RassegnaProgrammata } from "../../domain/entities/RassegnaProgrammata";
import { IRassegneRepository } from "../repositories/IRassegneRepository";
import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { RassegnaProgrammataDTO } from "../dto/RassegnaProgrammataDTO";
import { ILocationRepository } from "../repositories/ILocationRepository";
import { RassegnaProgrammataMapper } from "../mappers/RassegnaProgrammataMapper";

export class GetScheduledRassegneUseCase {
  private rassegneRepository: IRassegneRepository;
  private localitaRepository: ILocationRepository;
  
  constructor(
    rassegneRepository: IRassegneRepository,
    localitaRepository: ILocationRepository
  ) {
    this.rassegneRepository = rassegneRepository;
    this.localitaRepository = localitaRepository;
  }

  execute(): QueryResult<Array<RassegnaProgrammataDTO>> {
    const events = this.rassegneRepository.getScheduledEvents()
    if (events.length === 0) {
      QueryResult.fail(Error.notFound("No scheduled events now. Let us cook!"), [])
    }
    const correspondingLocations = events.map(rassegna => this.localitaRepository.getByID(rassegna.localita_id))
    if (!correspondingLocations) {
      QueryResult.fail(Error.failure("Something went wrong when fetching locations for each scheduled event."), [])
    }
    const dtos = events
      .zipWith(correspondingLocations)
      .map(( [event, location] ) => RassegnaProgrammataMapper.toDTO(event, location))
    return QueryResult.ok(dtos)
  }
}