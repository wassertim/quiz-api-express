import { Router } from "express";
import { getValidator } from "../../middleware/validator";
import { postQuizSubmission } from "./quiz-submission.controller";
import { quizSubmissionSchema } from "./quiz-submission.schema";

const withValidation = getValidator(quizSubmissionSchema);

export const quizSubmissionsRoute = Router()
    .post("/", withValidation, postQuizSubmission);