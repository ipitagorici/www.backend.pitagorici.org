import { TestataGiornalistica } from "../../domain/value_objects/TestataGiornalistica";
import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { ArticoloDTO } from "../dto/ArticoloDTO";
import { ArticoloMapper } from "../mappers/ArticoloMapper";
import { IArticleRepository } from "../repositories/IArticleRepository";
import { INewspaperRepository } from "../repositories/INewspaperRepository";

export class GetArticlesUseCase {

  constructor(
    private articlesRepository: IArticleRepository,
    private newspaperRepository: INewspaperRepository
  ) { }

  public execute(): QueryResult<ArticoloDTO[]> {
    const articlesQuery = this.articlesRepository.getAll();
    if (articlesQuery.isFailure()) {
      return QueryResult.fail(Error.notFound("No article has been published"));
    }
    const articles = articlesQuery.getValue();
    const newspapers = articles.map(article => this.newspaperRepository.getByID(article.testata_id))
    const dtos = articles.zipWith(newspapers).map(([article, newspaper]) =>
      ArticoloMapper.toDTO(article, newspaper.isFailure() ? {} as TestataGiornalistica : newspaper.getValue())
    )
    return QueryResult.ok(dtos)
  }
}