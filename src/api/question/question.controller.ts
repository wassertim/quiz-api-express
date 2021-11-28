import { Request, Response } from "express";
import { Question } from "@prisma/client";
import { constants } from "http2";
import { createQuestion } from "./question.service";
import { mapToStatusCode } from "../../errors/error.mapper";

export async function postQuestion(req: Request<unknown, unknown, Question>, res: Response<Question | string>) {
    return (await createQuestion(req.body))
        .map((question) =>
            res
                .set(constants.HTTP2_HEADER_LOCATION, `/questions/${question.id}`)
                .status(constants.HTTP_STATUS_CREATED)
                .send(question)
        )
        .mapErr((err) => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}
