import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRespository";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };
