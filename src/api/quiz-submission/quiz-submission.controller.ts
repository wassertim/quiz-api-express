import { Request, Response } from "express";
import { QuizSubmission } from "../../model";
import { constants } from "http2";
import { insertQuizSubmission } from "./quiz-submission.service";
import { mapToStatusCode } from "../../errors/error.mapper";

export async function postQuizSubmission(
    req: Request<unknown, unknown, QuizSubmission>,
    res: Response<QuizSubmission | string>
) {
    return (await insertQuizSubmission(req.body))
        .map((quizSubmission) => res.status(constants.HTTP_STATUS_CREATED).send(quizSubmission))
        .mapErr((err) => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}
