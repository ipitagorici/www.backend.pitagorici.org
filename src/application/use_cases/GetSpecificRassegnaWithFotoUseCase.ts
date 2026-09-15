import { IPhotosRepository } from "../repositories/IPhotosRepository";
import { IRassegneRepository } from "../repositories/IRassegneRepository";
import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { PastRassegnaWithPhotosMapper } from "../mappers/PastRassegnaWithPhotosMapper";
import { PastRassegnaWithFotoDTO } from "../dto/PastRassegnaWithFotoDTO";
import { ILocationRepository } from "../repositories/ILocationRepository";
import { ISponsorMaterialRepository } from "../repositories/ISponsorMaterialRepository";
import { IAlbumRepository } from "../repositories/IAlbumRepository";
import { Foto } from "../../domain/entities/Foto";
import { MaterialePubblicitario } from "../../domain/entities/MaterialePubblicitario";
import { Fotografo } from "../../domain/entities/Fotografo";

export class GetSpecificRassegnaWithFotoUseCase {
  
  public constructor(
    private rassegneRepository: IRassegneRepository,
    private locationRepository: ILocationRepository,
    private albumRepository: IAlbumRepository,
    private photosRepository: IPhotosRepository,
    private sponsoringMaterialRepository: ISponsorMaterialRepository
  ) { }

  public async execute(id: number): Promise<QueryResult<PastRassegnaWithFotoDTO>> {
    const pastEventQuery = this.rassegneRepository.getPastEventByID(id)
    if (pastEventQuery.isFailure()) {
      return QueryResult.fail(Error.notFound("Cannot find event with ID: " + id))
    }
    const pastEvent = pastEventQuery.getValue()
    
    const correspondingLocationQuery = this.locationRepository.getByID(pastEvent.localita_id)
    if (correspondingLocationQuery.isFailure()) {
      return QueryResult.fail(Error.failure("Something went wrong when fetching corresponding locations for past events!"))
    }

    const albumQuery = this.albumRepository.getByRassegnaID(pastEvent.id)
    if (albumQuery.isFailure()) {
      return QueryResult.fail(Error.notFound("Could not find photos album for event ID: " + pastEvent.id))
    }

    const albumID = albumQuery.getValue().id
    const coverPhotoQuery = await this.photosRepository.getRassegnaCoverByAlbumID(albumID)
    pastEvent.cover = coverPhotoQuery.isFailure() ? {} as Foto : coverPhotoQuery.getValue();
    
    const attachedPhotosQuery = await this.photosRepository.getByAlbumID(albumID)
    const attachedPhotos = attachedPhotosQuery.isFailure() ? [] : attachedPhotosQuery.getValue()
    
    const creditsQuery = this.albumRepository.getCreditsByAlbumID(albumID)
    const credits = creditsQuery.isFailure() ? [] as Fotografo[] : creditsQuery.getValue()

    const sponsoringMaterialQuery = this.sponsoringMaterialRepository.getByRassegnaID(pastEvent.id)
    const sponsoringMaterial = sponsoringMaterialQuery.isFailure() ? {} as MaterialePubblicitario : sponsoringMaterialQuery.getValue()
    
    return QueryResult.ok(PastRassegnaWithPhotosMapper.toDTO(pastEvent, correspondingLocationQuery.getValue(), { credits, pictures: attachedPhotos}, sponsoringMaterial))
  }
}