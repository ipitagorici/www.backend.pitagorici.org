import { IRassegneRepository } from "../repositories/IRassegneRepository";
import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { PastRassegnaDTO } from "../dto/PastRassegnaDTO";
import { ILocationRepository } from "../repositories/ILocationRepository";
import { PastRassegnaMapper } from "../mappers/PastRassegnaMapper";

export class GetPastRassegneUseCase {
  private rassegneRepository: IRassegneRepository;
  private locationRepository: ILocationRepository;
  
  constructor(rassegneRepository: IRassegneRepository, locationRepository: ILocationRepository) {
    this.rassegneRepository = rassegneRepository;
    this.locationRepository = locationRepository;
  }
  
  execute(): QueryResult<Array<PastRassegnaDTO>> {
    const pastEvents = this.rassegneRepository.getPastEvents()
    if (pastEvents.length === 0) {
      return QueryResult.fail(Error.notFound("Could not find any past events!"), [])
    }
    const correspondingLocations = pastEvents.map(rassegna => this.locationRepository.getByID(rassegna.localita_id))
    if (!correspondingLocations) {
      return QueryResult.fail(Error.failure("Something went wrong when fetching corresponding locations for past events!"), [])
    }
    const dtos = pastEvents.zipWith(correspondingLocations).map(([rassegna, location]) => PastRassegnaMapper.toDTO(rassegna, location))
    return (pastEvents.length === 0) ? 
      QueryResult.fail(Error.notFound("Could not find any past events!"), []) :
      QueryResult.ok(dtos)
  }
} 