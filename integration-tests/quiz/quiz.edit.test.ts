import { Operation } from "express-openapi-validate/dist/OpenApiDocument";
import { createQuiz, login, registerUser } from "../util/api";
import { initDatabase } from "../util/init.db";
import request from "supertest";
import { app } from "../../src/app";
import { openapi } from "../util/openapi";
import { constants } from "http2";

describe("Edit Quiz API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    const anotherUser = { login: "tim", password: "mypassword" };
    beforeEach(async () => {
        await registerUser(user);
        await registerUser(anotherUser);
    });
    test("Should update a quiz", async () => {
        const [method, path] = ["put" as Operation, "/profiles/{login}/quizzes/{quizId}"];
        const token = await login(user);
        const originalQuiz = {
            questions: [
                {
                    questionText: "what is the answer to life the universe and everything",
                    questionScore: 5,
                    answers: [
                        {
                            text: "2",
                            isCorrect: true,
                        },
                        {
                            text: "15",
                            isCorrect: false,
                        },
                    ],
                },
            ],
        };
        const { id } = await createQuiz(user.login, token, originalQuiz);
        const updatedQuiz = {
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
        };

        const response = await request(app)[method](path.replace("{login}", user.login).replace("{quizId}", id!))
            .set({ Authorization: token })
            .send(updatedQuiz);

        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
        expect(response.body.questions[0].answers[0].text).toBe(updatedQuiz.questions[0].answers[0].text);
    });
    test("Should allow edit only to creators of quiz", async () => {
        const [method, path] = ["put" as Operation, "/profiles/{login}/quizzes/{quizId}"];
        const token = await login(user);
        const anotherToken = await login(anotherUser);

        const originalQuiz = {
            questions: [
                {
                    questionText: "what is the answer to life the universe and everything",
                    questionScore: 5,
                    answers: [
                        {
                            text: "2",
                            isCorrect: true,
                        },
                        {
                            text: "15",
                            isCorrect: false,
                        },
                    ],
                },
            ],
        };
        const { id } = await createQuiz(user.login, token, originalQuiz);
        const updatedQuiz = {
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
        };

        const response = await request(app)[method](path.replace("{login}", user.login).replace("{quizId}", id!))
            .set({ Authorization: anotherToken })
            .send(updatedQuiz);

        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
        expect(response.text).toBe("You are not authorized to modify this resource");
    });
});
