import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new Category", async () => {
    const category = {
      name: "Test Category",
      description: "Description test category",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new Category with existent name", async () => {
    await createCategoryUseCase.execute({
      name: "Category 1",
      description: "Description Category 1",
    });

    await createCategoryUseCase.execute({
      name: "Category 2",
      description: "Description Category 2",
    });
  });

  it("should be able to list all categories", async () => {
    await createCategoryUseCase.execute({
      name: "Category 1",
      description: "Description Category 1",
    });

    expect(async () =>
      createCategoryUseCase.execute({
        name: "Category 1",
        description: "Description Category 2",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
