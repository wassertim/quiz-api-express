import { Quiz } from "@prisma/client";
import { err, ok, Result } from "neverthrow";
import { ApiError, ServiceError } from "../../errors/errors";
import { prisma } from "../db";

export function createQuiz(quiz: Quiz): Promise<Result<Quiz, ServiceError>> {
    return prisma.quiz
        .create({ data: quiz })
        .then(ok)
        .catch((e) => err({ code: ApiError.UNKNOWN_ERROR, message: e + "" } as ServiceError));
}

export function editQuiz(quizId: string, quiz: Quiz): Promise<Result<Quiz, ServiceError>> {
    return prisma.quiz
        .update({ where: { id: quizId }, data: quiz })
        .then(ok)
        .catch((e) => err({ code: ApiError.UNKNOWN_ERROR, message: e + "" } as ServiceError));
}
