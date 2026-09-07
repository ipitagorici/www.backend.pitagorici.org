import { IPhotosRepository } from "../repositories/IPhotosRepository";
import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { FotoDTO } from "../dto/FotoDTO";
import { FotoMapper } from "../mappers/FotoMapper";

export class GetRandomPhotosUseCase {
  private photosRepository: IPhotosRepository

  constructor(photosRepository: IPhotosRepository) {
    this.photosRepository = photosRepository;
  }

  public execute(quantity: number): QueryResult<Array<FotoDTO>> {
    if (quantity <= 0) {
      return QueryResult.fail(Error.invalid("Cannot get negative or zero photos! [Requiring " + quantity + " photos]"))
    }
    const result = this.photosRepository.getRandom(quantity)
    return (!result) ? 
      QueryResult.fail(Error.failure("Something went wrong when trying to fetch " + quantity + " random photos!"), []) :
      QueryResult.ok(result.map(foto => FotoMapper.toDTO(foto)))
  }
}