import { Quiz } from "@prisma/client";
import { ObjectId } from "mongodb";
import { err, ok } from "neverthrow";
import { Quizzes } from "../../db";
import { ApiError, ServiceError } from "../../errors/errors";
import { prisma } from "../db";

export async function createQuiz(quiz: Quiz) {
    try {
        return ok(await prisma.quiz.create({ data: quiz }));
    } catch (e) {
        return err({ code: ApiError.UNKNOWN_ERROR, message: e + "" } as ServiceError);
    }
}

export async function editQuiz(quizId: string, quiz: Quiz) {
    try {
        const result = await Quizzes().updateOne(
            { _id: ObjectId.createFromHexString(quizId) },
            { $set: quiz }
        );
        if (result.modifiedCount > 0) {
            return ok({ ...quiz, id: quizId });
        }
        return err({
            code: ApiError.UNKNOWN_ERROR,
            message: `Could not update the quiz at id ${quizId}`,
        } as ServiceError);
    } catch (e) {
        return err({ code: ApiError.UNKNOWN_ERROR, message: e + "" } as ServiceError);
    }
}
