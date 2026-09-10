import { IPhotosRepository } from "../repositories/IPhotosRepository";
import { IRassegneRepository } from "../repositories/IRassegneRepository";
import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { PastRassegnaWithPhotosMapper } from "../mappers/PastRassegnaWithPhotosMapper";
import { PastRassegnaWithFotoDTO } from "../dto/PastRassegnaWithFotoDTO";
import { ILocationRepository } from "../repositories/ILocationRepository";
import { ISponsorMaterialRepository } from "../repositories/ISponsorMaterialRepository";

export class GetSpecificRassegnaWithFotoUseCase {
  
  private rassegneRepository: IRassegneRepository;
  private photosRepository: IPhotosRepository;
  private locationRepository: ILocationRepository;
  private sponsoringMaterialRepository: ISponsorMaterialRepository;
  
  public constructor(
    rassegneRepository: IRassegneRepository,
    locationRepository: ILocationRepository,
    photosRepository: IPhotosRepository,
    sponsoringMaterialRepository: ISponsorMaterialRepository
  ) {
    this.rassegneRepository = rassegneRepository;
    this.locationRepository = locationRepository;
    this.photosRepository = photosRepository;
    this.sponsoringMaterialRepository = sponsoringMaterialRepository;
  }

  public execute(id: number): QueryResult<PastRassegnaWithFotoDTO> {
    const pastEvent = this.rassegneRepository.getPastEvents()
      .filter(rassegna => rassegna.id === id)
      .pop()
    if (!pastEvent) {
      return QueryResult.fail(Error.notFound("Cannot find event with ID: " + id))
    }
    const correspondingLocation = this.locationRepository.getByID(pastEvent.localita_id)
    if (!correspondingLocation) {
      return QueryResult.fail(Error.failure("Something went wrong when fetching corresponding locations for past events!"))
    }
    const attachedPhotos = this.photosRepository.getByRassegnaID(pastEvent.id) ?? []
    const sponsoringMaterial = this.sponsoringMaterialRepository.getByRassegnaID(pastEvent.id)
    return QueryResult.ok(PastRassegnaWithPhotosMapper.toDTO(pastEvent, correspondingLocation, attachedPhotos, sponsoringMaterial))
  }
}