import { Quiz } from "@prisma/client";
import Joi from "joi";
import { Answer, Question } from "../../model";

const answerSchema = Joi.object<Answer>({
    isCorrect: Joi.boolean().required(),
    text: Joi.string().min(1).required(),
});

const questionSchema = Joi.object<Question>({
    questionText: Joi.string().min(2).required(),
    questionScore: Joi.number().min(1).empty().default(1),
    answers: Joi.array().min(2).items(answerSchema),
});

export const quizSchema = Joi.object<Quiz>({
    questionIds: Joi.array().min(1).items(Joi.string()).required(),
});
