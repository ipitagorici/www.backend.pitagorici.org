import { Error } from "../../shared_kernel/Error";
import { QueryResult } from "../../shared_kernel/Result";
import { ArticoloDTO } from "../dto/ArticoloDTO";
import { ArticoloMapper } from "../mappers/ArticoloMapper";
import { IArticleRepository } from "../repositories/IArticleRepository";
import { INewspaperRepository } from "../repositories/INewspaperRepository";

export class GetArticlesUseCase {

  private articlesRepository: IArticleRepository;
  private newspaperRepository: INewspaperRepository;
  
  constructor(articlesRepository: IArticleRepository, newspaperRepository: INewspaperRepository) {
    this.articlesRepository = articlesRepository;
    this.newspaperRepository = newspaperRepository;
  }

  public execute(): QueryResult<ArticoloDTO[]> {
    const articles = this.articlesRepository.getAll()
    if (!articles) {
      return QueryResult.fail(Error.notFound("No article has been published"));
    }
    const newspapers = articles.map(article => this.newspaperRepository.getByID(article.testata_id))
    const dtos = articles.zipWith(newspapers).map(([ article, newspaper ]) => ArticoloMapper.toDTO(article, newspaper))
    return QueryResult.ok(dtos)
  }
}