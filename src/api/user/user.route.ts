import { Router } from "express";
import { getValidator } from "../../middleware/validator";
import { register, login } from "./user.controller";
import { userSchema } from "./user.schema";

const withValidation = getValidator(userSchema);

export const usersRoute = Router().post("/register", withValidation, register).post("/login", withValidation, login);
