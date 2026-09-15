import { ArticoloDTO } from "../../application/dto/ArticoloDTO";
import { FotoDTO } from "../../application/dto/FotoDTO";
import { PastRassegnaWithFotoDTO } from "../../application/dto/PastRassegnaWithFotoDTO";
import { RassegnaProgrammataDTO } from "../../application/dto/RassegnaProgrammataDTO";
import { IAlbumRepository } from "../../application/repositories/IAlbumRepository";
import { IArticleRepository } from "../../application/repositories/IArticleRepository";
import { ILocationRepository } from "../../application/repositories/ILocationRepository";
import { INewspaperRepository } from "../../application/repositories/INewspaperRepository";
import { IPhotosRepository } from "../../application/repositories/IPhotosRepository";
import { IRassegneRepository } from "../../application/repositories/IRassegneRepository";
import { ISponsorMaterialRepository } from "../../application/repositories/ISponsorMaterialRepository";
import { GetArticlesUseCase } from "../../application/use_cases/GetArticlesUseCase";
import { GetPastRassegneUseCase } from "../../application/use_cases/GetPastRassegneUseCase";
import { GetScheduledRassegneUseCase } from "../../application/use_cases/GetScheduledRassegneUseCase";
import { GetSpecificRassegnaWithFotoUseCase } from "../../application/use_cases/GetSpecificRassegnaWithFotoUseCase";
import { QueryResult } from "../../shared_kernel/Result";

export default class OpenController {

  private rassegneRepository: IRassegneRepository
  private albumRepository: IAlbumRepository
  private photosRepository: IPhotosRepository
  private locationRepository: ILocationRepository
  private articlesRepository: IArticleRepository
  private sponsoringMaterialRepository: ISponsorMaterialRepository
  private newspaperRepository: INewspaperRepository
  
  public constructor(
    rassegneRepository: IRassegneRepository,
    locationRepository: ILocationRepository,
    albumRepository: IAlbumRepository,
    photosRepository: IPhotosRepository,
    articlesRepository: IArticleRepository,
    sponsoringMaterialRepository: ISponsorMaterialRepository,
    newspaperRepository: INewspaperRepository
  ) {
    this.rassegneRepository = rassegneRepository;
    this.albumRepository = albumRepository;
    this.locationRepository = locationRepository;
    this.photosRepository = photosRepository;
    this.articlesRepository = articlesRepository;
    this.sponsoringMaterialRepository = sponsoringMaterialRepository;
    this.newspaperRepository = newspaperRepository;
  }

  public getPastRassegne() {
    return new GetPastRassegneUseCase(
      this.rassegneRepository,
      this.locationRepository,
      this.albumRepository,
      this.photosRepository
    ).execute()
  }

  public async getPastRassegnaWithPhotos(eventID: number): Promise<QueryResult<PastRassegnaWithFotoDTO>> {
    return new GetSpecificRassegnaWithFotoUseCase(
      this.rassegneRepository,
      this.locationRepository,
      this.albumRepository,
      this.photosRepository,
      this.sponsoringMaterialRepository
    ).execute(eventID)
  }

  public getScheduledRassegne(): QueryResult<RassegnaProgrammataDTO[]> {
    return new GetScheduledRassegneUseCase(this.rassegneRepository, this.locationRepository, this.sponsoringMaterialRepository).execute()
  }

  public getArticles(): QueryResult<ArticoloDTO[]> {
    return new GetArticlesUseCase(this.articlesRepository, this.newspaperRepository).execute()
  }
  
  public getHealth(): string {
    return "Everything is alive! Daje!"
  }
}