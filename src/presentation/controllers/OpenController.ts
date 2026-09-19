import { SponsorDTO } from "@/application/dto/SponsorDTO";
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
import { GetSponsorsUseCase } from "@/application/use_cases/GetSponsorsUseCase";
import { ISponsorsRepository } from "@/application/repositories/ISponsorsRepository";

export default class OpenController {
  
  public constructor(
    private rassegneRepository: IRassegneRepository,
    private locationRepository: ILocationRepository,
    private albumRepository: IAlbumRepository,
    private photosRepository: IPhotosRepository,
    private articlesRepository: IArticleRepository,
    private sponsoringMaterialRepository: ISponsorMaterialRepository,
    private newspaperRepository: INewspaperRepository,
    private sponsorsRepository: ISponsorsRepository
  ) { }

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

  public getSponsors(): QueryResult<SponsorDTO[]> {
    return new GetSponsorsUseCase(this.sponsorsRepository).execute()
  }
  
  public getHealth(): string {
    return "Everything is alive! Daje!"
  }
}