import { Category } from "@modules/cars/infra/typeorm/entities/Category";

interface ICreateCategoriesDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoriesDTO): Promise<void>;

  list(): Promise<Category[]>;

  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoriesDTO };
