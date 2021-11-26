import { Request, Response, Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification";
import listSpecificationsController from "../modules/cars/useCases/listSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req: Request, res: Response) => {
  return createSpecificationController().handle(req, res);
});

specificationsRoutes.get("/", (req, res) => {
  return listSpecificationsController().handle(req, res);
});

export { specificationsRoutes };
