import { Question } from "@prisma/client";
import { err, ok, Result } from "neverthrow";
import { ApiError, ServiceError } from "../../errors/errors";
import { prisma } from "../db";

export function createQuestion(question: Question): Promise<Result<Question, ServiceError>> {
    return prisma.question
        .create({ data: question })
        .then(ok)
        .catch((e) => err({code: ApiError.UNKNOWN_ERROR, message: e + ""} as ServiceError));
}
