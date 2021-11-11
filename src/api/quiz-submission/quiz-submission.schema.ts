import Joi from "joi";
import { QuestionAndAnswers, QuizSubmission } from "../../model";

const objIdPattern = /^[0-9a-fA-F]{24}$/;

const questionAndAnswersSchema = Joi.object<QuestionAndAnswers>({
    questionIndex: Joi.number().required(),
    answerIndicies: Joi.array().items(Joi.number()),
});

export const quizSubmissionSchema = Joi.object<QuizSubmission>({
    quizId: Joi.string().regex(objIdPattern).required(),
    questionsAndAnswers: Joi.array().items(questionAndAnswersSchema),
});
