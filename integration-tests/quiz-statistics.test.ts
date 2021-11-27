import { initDatabase } from "./util/init.db";
import { createQuiz, login, registerUser, submitQuiz } from "./util/api";
import request from "supertest";
import { app } from "../src/app";
import { constants } from "http2";
import { QuizSubmission } from "../src/model";
import { testQuiz } from "./util/mock.data";

describe("Quiz Statistics API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should return basic statistics for a quiz", async () => {        
        const token = await login(user);
        const { id } = await createQuiz(user.login, token, testQuiz);
        await submitQuiz({
            quizId: id,
            questionsAndAnswers: [{ questionIndex: 0, answerIndicies: [0] }],
        } as QuizSubmission);

        const response = await request(app).get(`/quiz-statistics/${id}`);
        
        expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    });
});
