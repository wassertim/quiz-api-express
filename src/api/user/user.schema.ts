import Joi from "joi";
import { User } from "../../model";

export const userSchema = Joi.object<User>({
    login: Joi.string().required(),
    password: Joi.string().required()
});