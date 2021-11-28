import { Question } from "@prisma/client";
import Joi from "joi";

export const questionSchema = Joi.object<Question>({
    questionScore: Joi.number().required().min(0),
    questionText: Joi.string().required().min(2)
});