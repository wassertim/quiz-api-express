import { ok } from "neverthrow";
import { Quizzes } from "../../../db";
import { createQuiz } from "../../../api/quiz/quiz.service";
import { getMockedCollection } from "../../../test/mongo.mock";
import { Quiz } from "../../../model";

jest.mock("../../../db");
jest.mock("../../../api/quiz/quiz.schema");

describe("Quiz Service Create Quiz", () => {
    test("Should return ok with quiz", async () => {
        const quiz = {
            questions: [
                {
                    questionText: "what is the answer to life the universe and everything",
                    questionScore: 5,
                    answers: [
                        {
                            text: "42",
                            isCorrect: true,
                        },
                        {
                            text: "41",
                            isCorrect: false,
                        },
                    ],
                },
            ],
        } as Quiz;
        const mockUserCollection = getMockedCollection(Quizzes);
        mockUserCollection.insertOne = jest.fn().mockImplementation(() => ({ ...quiz, insertedId: 42 }));

        const result = await createQuiz(quiz);

        expect(result).toStrictEqual(ok({ ...quiz, id: "42" }));
    });    
});
