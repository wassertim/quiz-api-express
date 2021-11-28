import { initDatabase } from "./util/init.db";
import { createAnswer, createQuestion, createQuiz, login, registerUser, submitQuiz } from "./util/api";
import request from "supertest";
import { app } from "../src/app";
import { constants } from "http2";
import { QuizSubmission } from "../src/model";
import { Answer, Question, Quiz } from "@prisma/client";

describe("Quiz Statistics API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should return basic statistics for a quiz", async () => {
        const { basicAuth } = await login(user);
        const question = {
            questionScore: 5,
            questionText: "What is the answer to life, universe and everything",
        };
        const { id: questionId } = await createQuestion(question as Question);
        const answers = [
            {
                text: "42",
                isCorrect: true,
                questionId: questionId,
            },
            {
                text: "41",
                isCorrect: true,
                questionId: questionId,
            },
        ];
        const createdAnswers = await Promise.all(answers.map(a => createAnswer(a as Answer)));
        const quiz = {
            questionIds: [questionId]
        };
        const { id: quizId } = await createQuiz(user.login, basicAuth, quiz as Quiz);
        await submitQuiz({
            quizId: quizId,
            questionsAndAnswers: [{ questionIndex: 0, answerIndicies: [0] }],
        } as QuizSubmission);

        const response = await request(app).get(`/quiz-statistics/${quizId}`);

        expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    });
});
