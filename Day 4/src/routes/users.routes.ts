import { Router } from "express";
import * as usersController from "../controllers/users.controller";
import { validate } from "../middlewares/validate.middleware";
import { signUpSchema, signInSchema } from "../schemas/users";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { Role } from "../types";

const router = Router();

router.post("/sign-up", validate(signUpSchema), usersController.signUp);
router.post("/sign-in", validate(signInSchema), usersController.signIn);

router.get("/", auth, authorize(Role.ADMIN), usersController.getAllUsers);
router.get("/:id", auth, authorize(Role.ADMIN), usersController.getUserById);
router.patch("/:id", auth, authorize(Role.ADMIN), usersController.updateUser);
router.delete("/:id", auth, authorize(Role.ADMIN), usersController.deleteUser);

export default router;
