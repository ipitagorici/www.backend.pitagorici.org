import { FotoDTO } from "../application/dto/FotoDTO";
import { RassegnaProgrammataDTO } from "../application/dto/RassegnaProgrammataDTO";
import { ILocationRepository } from "../application/repositories/ILocationRepository";
import { IPhotosRepository } from "../application/repositories/IPhotosRepository";
import { IRassegneRepository } from "../application/repositories/IRassegneRepository";
import { GetPastRassegneUseCase } from "../application/use_cases/GetPastRassegneUseCase";
import { GetRandomPhotosUseCase } from "../application/use_cases/GetRandomPhotosUseCase";
import { GetScheduledRassegneUseCase } from "../application/use_cases/GetScheduledRassegneUseCase";
import { QueryResult } from "../shared_kernel/Result";

export class HTTPController {

  private rassegneRepository: IRassegneRepository
  private photosRepository: IPhotosRepository
  private locationRepository: ILocationRepository
  
  public constructor(
    rassegneRepository: IRassegneRepository,
    locationRepository: ILocationRepository,
    photosRepository: IPhotosRepository
  ) {
    this.rassegneRepository = rassegneRepository;
    this.locationRepository = locationRepository;
    this.photosRepository = photosRepository;
  }

  public getPastRassegne() {
    return new GetPastRassegneUseCase(this.rassegneRepository, this.locationRepository).execute()
  }

  public getRandomPhotos(quantity: number): QueryResult<FotoDTO[]> {
    return new GetRandomPhotosUseCase(this.photosRepository).execute(quantity)
  }

  public getScheduledRassegne(): QueryResult<RassegnaProgrammataDTO[]> {
    return new GetScheduledRassegneUseCase(this.rassegneRepository, this.locationRepository).execute()
  }
  
  public getHealth() {
    return { status: "Everything is alive! Daje!" }
  }
}