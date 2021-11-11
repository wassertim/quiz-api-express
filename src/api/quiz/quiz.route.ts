import { Router } from "express";
import { postQuiz, putQuiz } from "./quiz.controller";
import { withAuthorization } from "../../middleware/authorize";
import { withAuthentication } from "../../middleware/passport";
import { getValidator } from "../../middleware/validator";
import { quizSchema } from "./quiz.schema";

const withValidation = getValidator(quizSchema);

export const quizRouter = Router()
    .post("/", withAuthentication, withValidation, withAuthorization, postQuiz)
    .put("/:quizId/", withValidation, withAuthentication, withAuthorization, putQuiz);
