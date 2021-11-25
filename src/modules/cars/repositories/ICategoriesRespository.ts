import { Category } from "../model/Category";

interface ICreateCategoriesDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoriesDTO): void;

  list(): Category[];

  findByName(name: string): Category;
}

export { ICategoriesRepository, ICreateCategoriesDTO };
