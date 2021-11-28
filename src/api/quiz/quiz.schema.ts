import { Quiz } from "@prisma/client";
import Joi from "joi";

export const quizSchema = Joi.object<Quiz>({
    questionIds: Joi.array().min(1).items(Joi.string()).required(),
});
