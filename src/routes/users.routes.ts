import { Router } from "express";
import multer from "multer";

import { updloadConfig } from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const usersRoutes = Router();

const upload = multer(updloadConfig.upload("./tmp/avatars"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
