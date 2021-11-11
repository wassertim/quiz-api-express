import { Request, Response } from "express";
import { Quiz, User } from "../../model";
import { constants } from "http2";
import { createQuiz, editQuiz } from "./quiz.service";
import { mapToStatusCode } from "../../errors/error.mapper";

export async function postQuiz(req: Request<unknown, unknown, Quiz>, res: Response<Quiz | string>) {
    const { login } = <User>req.user;
    return (await createQuiz({ ...req.body, createdBy: login! }))
        .map((quiz) => {
            return res
                .set(constants.HTTP2_HEADER_LOCATION, `/profiles/${login!}/quizzes/${quiz.id}`)
                .status(constants.HTTP_STATUS_CREATED)
                .send(quiz);
        })
        .mapErr((err) => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}

export async function putQuiz(req: Request<Record<string, string>, unknown, Quiz>, res: Response<Quiz | string>) {
    return (await editQuiz(req.params.quizId, { ...req.body, createdBy: (<User>req.user).login! }))
        .map((quiz) => res.status(constants.HTTP_STATUS_OK).send(quiz))
        .mapErr((err) => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}
