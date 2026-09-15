import { IRassegneRepository } from "../repositories/IRassegneRepository";
import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { PastRassegnaDTO } from "../dto/PastRassegnaDTO";
import { ILocationRepository } from "../repositories/ILocationRepository";
import { PastRassegnaMapper } from "../mappers/PastRassegnaMapper";
import { IAlbumRepository } from "../repositories/IAlbumRepository";
import { IPhotosRepository } from "../repositories/IPhotosRepository";
import { Foto } from "../../domain/entities/Foto";

export class GetPastRassegneUseCase {
  
  constructor(
    private rassegneRepository: IRassegneRepository,
    private locationsRepository: ILocationRepository,
    private albumsRepository: IAlbumRepository,
    private photosRepository: IPhotosRepository
  ) { }
  
  async execute(): Promise<QueryResult<PastRassegnaDTO[]>> {
    const pastEventsQueryResult = this.rassegneRepository.getPastEvents()
    if (pastEventsQueryResult.isFailure()) {
      return QueryResult.fail(Error.notFound("Could not find any past events!"), [])
    }
    const pastEvents = pastEventsQueryResult.getValue()
    const correspondingLocationsQueryResults = pastEvents.map(rassegna => this.locationsRepository.getByID(rassegna.localita_id))
    if (correspondingLocationsQueryResults.some(qr => qr.isFailure())) {
      return QueryResult.fail(Error.failure("Something went wrong when fetching corresponding locations for past events!"), [])
    }
    
    const correspondingLocations = correspondingLocationsQueryResults.map(qr => qr.getValue())
    const covers = pastEvents
      .map(event => this.albumsRepository.getByRassegnaID(event.id))
      .map(async (albumQR) => albumQR.isFailure() ?
        QueryResult.fail(Error.failure(albumQR.getError().description), {} as Foto) :
        await this.photosRepository.getRassegnaCoverByAlbumID(albumQR.getValue().id)
      );
    
    const dtos = Promise.all(pastEvents.zipWith(correspondingLocations, covers).map(
      async ([rassegna, location, cover]) => PastRassegnaMapper.toDTO(rassegna, location, (await cover).getValue())
    ))
    return QueryResult.ok(await dtos)
  }
} 