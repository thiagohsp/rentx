import { Request, Response, Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import importCategoryController from "../modules/cars/useCases/importCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();
categoriesRoutes.post("/", (req: Request, res: Response) => {
  return createCategoryController().handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController().handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController().handle(req, res);
});

export { categoriesRoutes };
