import { Router } from "express";
import { getValidator } from "../../middleware/validator";
import { postQuestion } from "./question.controller";
import { questionSchema } from "./question.schema";

const withValidation = getValidator(questionSchema);

export const questionRouter = Router()
    .post("/", withValidation, postQuestion);