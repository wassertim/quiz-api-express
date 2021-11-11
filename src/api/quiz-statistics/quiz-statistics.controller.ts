import { Request, Response } from "express";
import { constants } from "http2";
import { mapToStatusCode } from "../../errors/error.mapper";
import { findQuizStatistics } from "./quiz-statistics.service";

export async function getQuizStatistics(req: Request, res: Response<unknown | string>) {    
    return (await findQuizStatistics(req.params.quizId))
        .map(statistics => res.status(constants.HTTP_STATUS_OK).send(statistics))
        .mapErr(err => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown error"));
}