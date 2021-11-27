import { ok } from "neverthrow";
import { createQuiz } from "../../../api/quiz/quiz.service";
import { mocked } from "ts-jest/utils";
import { prisma } from "../../db";
import { Quiz } from "@prisma/client";

describe("Quiz Service Create Quiz", () => {
    const mockedPrisma = mocked(prisma);
    const mockedQuiz = mocked(mockedPrisma.quiz);
    test("Should return ok with quiz", async () => {
        const quiz = {
            questionIds: ["fsd"],
        } as Quiz;    
        mockedQuiz.create = jest.fn().mockResolvedValue(quiz);        

        const result = await createQuiz(quiz);

        expect(result).toStrictEqual(ok(quiz));
    });
});
